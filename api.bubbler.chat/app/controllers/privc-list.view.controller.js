const config = require("../config/app.config");

const { 
	createPrivCList,
	findOnePrivCList,
	findOneAndUpdatePrivCList
} = require('./privc-list.model.controller.js');

const { 
	findOneAndUpdateUser
} = require('./user.model.controller.js');

var status = ['active', 'pending', 'hidden', 'archived', 'deleted']

exports.create = async (req, res) => {

	var auth = await findOneAuth(req.session.authId, res);

	var privCListObj = {};
	var status = config.PRIV_CHAT.STATUS;
	for (let [key, val] of Object.entries(obj)) {
		if(req.body[key] && status.contains(key)) {
			privCListObj[key] = val.forEach(e => req.sanitize(e));
		}
	}
	var privCList = await createPrivCList(privCListObj, res);

	var user = await findOneAndUpdateUser(auth.user, {
		privateChats: privCList._id
	}, res);

	res.json(privCList);
};

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var privCList = await findOnePrivCList(id, res);
	

	Object.entries(privCList._doc).forEach(async ([key, value]) => {
		if(status.includes(key)) {

			privCList._doc[key] = value.reverse()
		}
	})
	res.json(privCList)
};

exports.updateOne = async (req, res) => {
	var id = req.sanitize(req.params.id);

	var privCListObj = {};
	for (let [key, val] of Object.entries(obj)) {
		if(req.body[key] && status.contains(key)) {
			privCListObj[key] = val.forEach(e => req.sanitize(e));
		}
	}

	var privCList = await findOneAndUpdatePrivCList(id, privCListObj, res);

	res.json(privCList);
};
