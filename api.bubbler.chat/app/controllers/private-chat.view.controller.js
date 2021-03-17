const config = require("../config/app.config");

const { 
	findOnePrivateChat,
	createPrivateChat 
} = require('./private-chat.model.controller');

const { findOneAuth } = require('./auth.model.controller');

const { findOneUser } = require('./user.model.controller');

const { createRole } = require('./role.model.controller');

const {
	createPrivCList,
	findOnePrivCList,
	updateOnePrivCList
} = require('./privc-list.model.controller');

const { 
	createPrivCParticipant 
} = require('./privc-participant.model.controller');

const { 
	createPrivCParticipantsList 
} = require('./privc-participants-list.model.controller');

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
	console.log('auth',auth);
	var adminRole = await createRole({
		name: "admin",
		privileges: config.PRIVATE_CHAT.ROLES.ADMIN
	}, res);
	console.log('adminRole',adminRole);
	var admin = await findOneUser(auth.user, res);
	console.log('admin',admin);
	// create PrivateChatParticipant for admin
	var chatAdmin = await createPrivCParticipant({
		user: auth.user,
		role: adminRole._id,
		status: "active"
	}, res);
	console.log('chatAdmin',chatAdmin);
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
			console.log('role',role);
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
					console.log('privCParticipant',privCParticipant);
					participants[keyLower].push(privCParticipant._id);
				}	
			} 
		}
	}

	var privCParticipantsList = await createPrivCParticipantsList(participants, res);
	console.log('privCParticipantsList',privCParticipantsList);
	privCObj.participantsList = privCParticipantsList._id;

	var privateChat = await createPrivateChat(privCObj, res);
	// Notify participants !!!
	console.log('privateChat',privateChat);
	if (!admin.privCList) {
		var privCList = await createPrivCList({
			active: [{
				privateChat: privateChat._id, 
				participant: chatAdmin._id
			}]
		}, res);
		console.log('privCList',privCList);
	} else {
		var privCList = await findOnePrivCList(user.privCList, res);
		privCList.active.push({
				privateChat: privateChat._id, 
				participant: chatAdmin._id
		});
		console.log('privCList',privCList);
		await updateOnePrivCList(user.privCList, {
			active: privCList.active
		}, res);
		var privCList2 = await findOnePrivCList(user.privCList, res);
		console.log('privCList2',privCList2);
	}

	res.json(privateChat);
	
};

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var privateChat = await findOnePrivateChat(id, res);
	res.json(privateChat);
};

