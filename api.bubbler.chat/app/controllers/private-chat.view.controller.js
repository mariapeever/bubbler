const config = require("../config/app.config");

const { 
	findOnePrivateChat,
	createPrivateChat,
	findPrivateChats,
	findOneAndUpdatePrivateChat
} = require('./private-chat.model.controller');

const { findOneAuth } = require('./auth.model.controller');

const { findOneUser, findOneUserByStatus, findOneAndUpdateUser, createUser } = require('./user.model.controller');

const { createRole, findOneRoleByName } = require('./role.model.controller');

const {
	createPrivCList,
	findOnePrivCList,
	findOneAndUpdatePrivCList
} = require('./privc-list.model.controller');

const {
	createPrivCMsgList
} = require('./privc-msg-list.model.controller');

const {
	createPrivCMessage
} = require('./privc-message.model.controller');

const { 
	createPrivCParticipant 
} = require('./privc-participant.model.controller');

const { 
	createPrivCParticList 
} = require('./privc-partic-list.model.controller');

exports.create = async (req, res) => {
	// sanitize fields
	var auth = await findOneAuth(req.session.authId, res);
	var adminRole = await findOneRoleByName("admin", res);
	if(!adminRole) {
		adminRole = await createRole({
			name: "admin",
			privileges: config.PRIVATE_CHAT.ROLES.ADMIN
		}, res);
	}

	var admin = await findOneUser(auth.user, res);
	// create PrivateChatParticipant for admin
	var chatAdmin = await createPrivCParticipant({
		user: auth.user,
		role: adminRole._id,
		status: "active"
	}, res);

	var system = await findOneUserByStatus("system", res);

	if (!system) {
		system = await createUser({ 
			firstName: 'System',
			email: 'system@bubbler.chat',
			status: "system",
			privacy: 
			{
				firstName: 'public',
				email: 'public'
			},
	 	}, res);
	}

	var systemRole = await findOneRoleByName("system", res);
	console.log('systemRole', systemRole);
	if (!systemRole) {
		systemRole = await createRole({
			name: "system",
			privileges: config.PRIVATE_CHAT.ROLES.SYSTEM
		}, res);
		console.log('systemRole 2', systemRole);
	}

	var chatSystem = await createPrivCParticipant({
		user: system._id,
		role: systemRole._id,
		status: "system"
	}, res);

	var participants = {};

	participants.admin = [chatAdmin._id];
	participants.system = [system._id];

	// create other roles and participants (as necessary)
	if (req.body.participants) {
		var privCParticipants = req.body.participants;
		if (privCParticipants.admin) {
			delete privCParticipants.admin;
		}

		for (let [key, val] of Object.entries(config.PRIVATE_CHAT.ROLES)) {

			var keyLower = key.toLowerCase();
			
			var role = await createRole({
					name: keyLower,
					privileges: val
			}, res);
			if(privCParticipants[keyLower]) {
				participants[keyLower] = [];
				for (var i = 0; i < privCParticipants[keyLower].length; i++) {
					;
					let userId = req.sanitize(privCParticipants[keyLower][i]);
					
					let privCParticipant = await createPrivCParticipant({
						user: userId,
						role: role._id,
						status: key == "ADMIN" ? "active" : "invited"
					}, res);
					participants[keyLower].push(privCParticipant._id);
				}	
			} 
		}
	}

	var privCObj = {};

	if (req.body.title) {
		privCObj.title = req.sanitize(req.body.title);
	} else {
		privCObj.title = '';
	}

	if (req.body.description) {
		privCObj.description = req.sanitize(req.body.description);
	} else {
		privCObj.description = '';
	}

	var privCParticList = await createPrivCParticList(participants, res);

	privCObj.participantsList = privCParticList._id;

	var message = await createPrivCMessage({
		participant: system._id,
		type: 'system',
		content: new Date(),
		status: 'ok'
	});

	console.log('message',message)

	var messagesList = await createPrivCMsgList({
		ok: [message._id]
	}, res);

	console.log('messagesList',messagesList)

	privCObj.messagesList = messagesList._id;

	var privateChat = await createPrivateChat(privCObj, res);


	// Notify participants !!!
	if (!admin.privateChats) {

		var privCList = await createPrivCList({
			active: [{
				privateChat: privateChat._id, 
				participant: chatAdmin._id
			}]
		}, res);
		await findOneAndUpdateUser(admin.id, {
			privateChats: privCList._id
		})

	} else {
		var privCList = await findOnePrivCList(admin.privateChats, res);
		privCList.active.push({
			privateChat: privateChat._id, 
			participant: chatAdmin._id
		});
		await findOneAndUpdatePrivCList(admin.privateChats, {
			active: privCList.active
		}, res);
		var privCList2 = await findOnePrivCList(admin.privateChats, res);
	}

	res.json(privateChat);
};

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var privateChat = await findOnePrivateChat(id, res);
	res.json(privateChat);
};

exports.find = async (req, res) => {
	if (!req.query.ids) {
		return res.status(400).send({
			message: 'Ids must not be empty.'
		});
	}
	var ids = req.query.ids;
	ids = ids.split(',');
	ids.forEach(id => req.sanitize(id));

	var privateChats = await findPrivateChats(ids, res);
	res.json(privateChats);
};

exports.updateOne = async (req, res) => {

	var privateChatObj = {};
	// sanitize
	for (let [key, val] of Object.entries(req.body)) {
		if(config.FIELDS.PRIVATE_CHAT.includes(key)) {
			privateChatObj[key] = req.sanitize(val);
		}
	}
	
	var id = req.sanitize(req.params.id);
	var privateChat = await findOneAndUpdatePrivateChat(id, privateChatObj, res);

	res.json(privateChat);
};
