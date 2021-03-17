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

	return await privCList.findById(id)
		.catch(err => {
			res.status(500).send({ message: err });
		});	
};

exports.updateOnePrivCList = async (id, obj, res) => {
	obj._id = id;
	return await obj.save(obj)
		.catch(err => {
			res.status(500).send({ message: err });
		});	
};

