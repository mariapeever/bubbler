const db = require("../models");

const PrivCParticList = db.privCParticLists;

exports.createPrivCParticList = async (obj, res) => {
	var privCParticList = new PrivCParticList(obj);

	return await privCParticList.save(privCParticList)
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOnePrivCParticList = async (id, res) => {
	return await PrivCParticList.findById(id)
		.then(list => {
			try{
				if (!list) throw 'Messages list not found';
				return list;
			} catch {
				return false;
			}
		})
			.catch(err => {
				res.staus(500).send({ message: err });
			});
};

exports.findOneAndUpdatePrivCParticList = async (id, obj, res) => {

	return await PrivCParticList.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(privCParticList => {
			try {
				if (!privCParticList) throw 'Private chats messages list not found.';
				return privCParticList;
			} catch (err) {
				return false;
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};




































