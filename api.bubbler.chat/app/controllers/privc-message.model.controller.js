const db = require("../models");

const PrivCMessage = db.privCMessages;

exports.createPrivCMessage = async (obj, res) => {
	var message = new PrivCMessage(obj);
	return await message.save()
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOnePrivCMessage = async (id, res) => {
	
	return await PrivCMessage.findById(id)
		.then(msg => {
			try {
				if (!msg) throw 'Message not found.';
				return msg;
			} catch {
				return false;
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findPrivCMessages = async (ids, res) => {
	var cond = { _id: { $in: ids } };
	return await PrivCMessage.find(cond)
	.sort({'date': -1}).limit(20)
		.then(msgs => {
			try {
				if (!msgs) throw 'Private chat messages not found.';
				return msgs;
			} catch {
				return false;
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findOneAndUpdatePrivCMessage = async (id, obj, res) => {

	return await PrivCMessage.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(privCMessage => {
			try {
				if (!privCMessage) throw 'Private chat message not found.';
				return privCMessage;
			} catch (err) {
				return false;
			}
		})
		.catch(err => {
			res.status(500).send({ message: err });
		});
};
