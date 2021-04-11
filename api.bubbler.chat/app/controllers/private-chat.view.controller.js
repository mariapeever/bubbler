const config = require("../config/app.config");

const { 
	findOnePrivateChat,
	createPrivateChat,
	findPrivateChats,
	findOneAndUpdatePrivateChat
} = require('./private-chat.model.controller');

const { findOneAuth } = require('./auth.model.controller');

const { findOneUser, findOneAndUpdateUser } = require('./user.model.controller');

const { createRole } = require('./role.model.controller');

const {
	createPrivCList,
	findOnePrivCList,
	findOneAndUpdatePrivCList
} = require('./privc-list.model.controller');

const { 
	createPrivCParticipant 
} = require('./privc-participant.model.controller');

const { 
	createPrivCParticList 
} = require('./privc-partic-list.model.controller');

exports.create = async (req, res) => {
	// sanitize fields

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

	var auth = await findOneAuth(req.session.authId, res);
	var adminRole = await createRole({
		name: "admin",
		privileges: config.PRIVATE_CHAT.ROLES.ADMIN
	}, res);
	var admin = await findOneUser(auth.user, res);
	console.log('admin',admin)
	// create PrivateChatParticipant for admin
	var chatAdmin = await createPrivCParticipant({
		user: auth.user,
		role: adminRole._id,
		status: "active"
	}, res);
	var participants = {};

	participants.admin = [chatAdmin._id];

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

	var privCParticList = await createPrivCParticList(participants, res);
	privCObj.participantsList = privCParticList._id;

	var privateChat = await createPrivateChat(privCObj, res);
	// Notify participants !!!
	console.log('admin.privateChats',admin.privateChats)
	if (!admin.privateChats) {

		var privCList = await createPrivCList({
			active: [{
				privateChat: privateChat._id, 
				participant: chatAdmin._id
			}]
		}, res);
		findOneAndUpdateUser(admin.id, {
			privateChats: privCList._id
		})

	} else {
		console.log('admin.privateChats',admin.privateChats)
		var privCList = await findOnePrivCList(admin.privateChats, res);
		privCList.active.push({
			privateChat: privateChat._id, 
			participant: chatAdmin._id
		});
		console.log('privCList1',privCList)
		findOneAndUpdatePrivCList(admin.privateChats, {
			active: privCList.active
		}, res);
		var privCList2 = await findOnePrivCList(admin.privateChats, res);
		console.log('privCList2',privCList2)
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
