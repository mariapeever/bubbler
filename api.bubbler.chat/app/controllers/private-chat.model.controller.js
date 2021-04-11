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

exports.findPrivateChats = async (ids, res) => {
	
	var cond = { _id: { $in: ids } };
	return await PrivateChat.find(cond)
		.then(chats => {
			try {
				if (!chats) throw 'Private chats not found.';
				return chats;
			} catch {
				res.status(404).send({ message: 'Not found' });
			}
			return data
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};

exports.findOneAndUpdatePrivateChat = async (id, obj, res) => {

	return await PrivateChat.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(privateChat => {
			try {
				if (!privateChat) throw 'Private chat not found.';
				return privateChat;
			} catch (err) {
				res.status(404).send({ message: err });
			}
		})
		.catch(err => {
			res.status(500).send({ message: err });
		});
};
