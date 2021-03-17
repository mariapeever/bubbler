// Auth model controller
const db = require("../models");

const Auth = db.auths;

exports.findOneAuth = async (id, res) => {

	return await Auth.findById(id)
		.then(auth  => { 
			try {
				if (!auth) throw 'Auth not found.';
				return auth;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findOneAuthByUsername = async (username, res) => {

	return await Auth.findOne({ username: username })
		.then(auth => {
			try {
				if (!auth) throw `User ${username} not found.`;
				return auth;
			} catch (err) {
				return res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
}

exports.createAuth = async (obj, res) => {
	var auth = new Auth(obj);

	return await auth.save(auth)
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOneAndUpdateAuth = async (id, obj, res) => {

	return await Auth.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(auth => {
			try {
				if (!auth) throw 'Auth not found.';
				return auth;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOneAndDeleteAuth = async (id, res) => {

	return await Auth.findByIdAndDelete(id, { useFindAndModify: false })
		.then(auth => {
			try {
				if (!auth) throw 'Auth not found.';
				return auth;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};


