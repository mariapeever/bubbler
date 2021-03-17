const db = require("../models");

const PrivateChat = db.privateChats;

exports.createPrivateChat = async (obj, res) => {
	var privateChat = new PrivateChat(obj);

	return await privateChat.save()
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOnePrivateChat = async (id, res) => {

	return await PrivateChat.findById(id)
		.then(chat  => { 
			try {
				if (!chat) throw 'Private chat not found.';
				return chat;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};