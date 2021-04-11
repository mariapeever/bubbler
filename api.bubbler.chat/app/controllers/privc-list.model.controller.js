const db = require("../models");

const PrivCList = db.privCLists;

exports.createPrivCList = async (obj, res) => {
	var privCList = new PrivCList(obj);

	return await privCList.save()
		.catch(err => {
			res.status(500).send({ message: err });
		});	
};

exports.findOnePrivCList = async (id, res) => {

	return await PrivCList.findById(id)
		.then(privCList  => { 
			try {
				if (!privCList) throw 'Private chats list not found.';
				return privCList;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findOneAndUpdatePrivCList = async (id, obj, res) => {

	return await PrivCList.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(privCList => {
			try {
				if (!privCList) throw 'Private chats list not found.';
				return privCList;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};