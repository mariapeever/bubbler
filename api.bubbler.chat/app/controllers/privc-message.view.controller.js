// Private chat mesasge view controller
const { 
	createPrivCMessage ,
	findOnePrivCMessage,
	findPrivCMessages,
	findOneAndUpdatePrivCMessage
} = require('./privc-message.model.controller');
const { findOneAuth } = require('./auth.model.controller');
const { findOnePrivateChat, findOneAndUpdatePrivateChat } = require('./private-chat.model.controller');
const { findOnePrivCParticipant } = require('./privc-participant.model.controller');
const { 
	findOnePrivCMsgList, 
	createPrivCMsgList,
	findOneAndUpdatePrivCMsgList
} = require('./privc-msg-list.model.controller');


exports.create = async (req, res) => {

	var auth = await findOneAuth(req.session.authId, res);
	var type = req.sanitize(req.body.type);
	var content = req.sanitize(req.body.content);
	if (req.body.attachments) {
		var attachments = req.body.attachments;

		for (let [key, value] of Object.entries(attachments)) {
		    attachments[key].forEach(atch => req.sanitize(atch));
		}
	}
	var participantId = req.sanitize(req.body.participant);

	var participant = await findOnePrivCParticipant(participantId, res);

	var message = await createPrivCMessage({
		participant: participant._id,
		type: type,
		content: content,
		status: 'sent',
		attachments: attachments
	});

	var privateChatId = req.sanitize(req.body.privateChat);
	var privateChat = await findOnePrivateChat(privateChatId, res);
	if (!privateChat.messagesList) {
		var messagesList = await createPrivCMsgList({
			ok: [message._id]
		}, res);
		findOneAndUpdatePrivateChat(privateChat._id, {
			messagesList: messagesList._id
		})
	} else {
		var messagesList = await findOnePrivCMsgList(privateChat.messagesList)
		messagesList.ok.push(message._id);
		findOneAndUpdatePrivCMsgList(privateChat.messagesList, messagesList, res);
	}
	
	// send pending messages

	res.json(message);
};

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var privCMessage = await findOnePrivCMessage(id, res);
	res.json(privCMessage);
};

exports.find = async (req, res) => {
	
	var ids = req.sanitize(req.query.ids);
	ids = ids.split(',');

	var privCMessages = await findPrivCMessages(ids, res);
	res.json(privCMessages);
};

exports.updateOne = async (req, res) => {

	var privCMessageObj = {};
	// sanitize
	for (let [key, val] of Object.entries(req.body)) {
		if(config.FIELDS.PRIVC_MESSAGE.includes(key)) {
			privCMessageObj[key] = req.sanitize(val);
		}
	}
	
	var id = req.sanitize(req.params.id);
	var privCMessage = await findOneAndUpdatePrivCMessage(id, privCMessageObj, res);

	res.json(privCMessage);
};






































