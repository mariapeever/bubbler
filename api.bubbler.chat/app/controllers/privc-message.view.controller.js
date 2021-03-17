// Private chat mesasge view controller
const { createPrivCMessage } = require('./privc-message.model.controller');
const { findOneAuth } = require('./auth.model.controller');
const { findOnePrivateChat } = require('./private-chat.model.controller');
const { findOnePrivCParticipant } = require('./privc-participant.model.controller');
const { 
	findOnePrivCMessagesList, 
	createPrivCMessagesList,
	updateOnePrivCMessagesList
} = require('./privc-messages-list.model.controller');

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

	var messagesList;
	if (!privateChat.messagesList) {
		messagesList = await createPrivCMessagesList({
			pending: [message._id]
		}, res);
		privateChat.messagesList = messagesList._id;
	} else {
		messagesList = await findOnePrivCMessagesList(
			privateChat.messagesList, res);
		messagesList.pending.push(message._id);
		
		await updateOnePrivCMessagesList(privateChat.messagesList, {
			ok: messagesList.ok
		}, res);
	}	

	// send pending messages

	res.json(message);
};