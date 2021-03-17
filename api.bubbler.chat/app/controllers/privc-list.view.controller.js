const config = require("../config/app.config");

const { 
	createPrivCList 
} = require('./privc-list.model.controller.js');

const { 
	findOneAndUpdateUser 
} = require('./user.model.controller.js');

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
		privateChats: privCList._id;
	}, res);

	res.json(privCList);
};
