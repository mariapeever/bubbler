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
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};