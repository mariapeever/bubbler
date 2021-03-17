const db = require('../models');

const User = db.users;

exports.findOneUser = async (id, res) => {

	return await User.findById(id)
		.then(user  => { 
			try {
				if (!user) throw 'User not found.';
				return user;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findUsers = async (ids, res) => {
	
	var cond = { _id: { $in: ids } };
	return await User.find(cond)
		.then(users => {
			try {
				if (!users) throw 'Users not found.';
				return users;
			} catch {
				res.status(404).send({ message: 'Not found' });
			}
			return users
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findActiveUsers = async (ids, res) => {
	
	var cond = { _id: { $in: ids }, status: "active"};
	return await User.find(cond)
		.then(users => {
			try {
				if (!users) throw 'Users not found.';
				return users;
			} catch {
				res.status(404).send({ message: 'Not found' });
			}
			return users
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.createUser = async (obj, res) => {
	var user = new User(obj);

	return await user.save(user)
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOneAndUpdateUser = async (id, obj, res) => {

	return await User.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(user => {
			try {
				if (!user) throw 'User not found.';
				return user;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
		.catch(err => {
			res.status(500).send({ message: err });
		});
};


exports.findOneAndDeleteUser = async (id, res) => {

	return await User.findByIdAndDelete(id, { useFindAndModify: false })
		.then(user => {
			try {
				if (!user) throw 'User not found.';
				return user;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};