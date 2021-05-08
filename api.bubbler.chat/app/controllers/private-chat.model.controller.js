const db = require("../models");

const PrivateChat = db.privateChats;

exports.createPrivateChat = async (obj, res) => {
	obj._id = new db.mongoose.Types.ObjectId(obj._id);
	console.log('Mongoose ID 1', obj._id)
	console.log('obj',obj)
	var privateChat = new PrivateChat(obj);
	console.log('Mongoose ID 2',privateChat)
	
	return await privateChat.save()
		.catch(err => {
			return res.status(500).send({ message: err });
		});
};

exports.findOnePrivateChat = async (id, res) => {

	return await PrivateChat.findById(id)
		.then(chat  => { 
			try {
				if (!chat) throw 'Private chat not found.';
				return chat;
			} catch (err) {
				return false;
			}
		})
			.catch(err => {
				return res.status(500).send({ message: err });
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
				return false;
			}
		})
			.catch(err => {
				return res.status(500).send({ message: err });
			});
};

exports.findOneAndUpdatePrivateChat = async (id, obj, res) => {

	return await PrivateChat.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false })
		.then(privateChat => {
			try {
				if (!privateChat) throw 'Private chat not found.';
				return privateChat;
			} catch (err) {
				return false;
			}
		})
		.catch(err => {
			return res.status(500).send({ message: err });
		});
};