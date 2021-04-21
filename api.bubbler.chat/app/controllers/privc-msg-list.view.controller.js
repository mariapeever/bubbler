const config = require("../config/app.config");

const { 
	findOnePrivCMsgList
} = require('./privc-msg-list.model.controller.js');

const { 
	findOnePrivCMessage
} = require('./privc-message.model.controller.js');

exports.findOne = async (req, res) => {
	var id = req.sanitize(req.params.id);
	var privCMsgList = await findOnePrivCMsgList(id, res);
	var status = ['ok', 'flagged', 'removed']

	Object.entries(privCMsgList._doc).forEach(async ([key, value]) => {
		if(status.includes(key)) {
			let n = value.length 
			let limit = 20
			privCMsgList._doc[key] = value.slice(Math.max(n - limit, 0), n)
		}
	})
	res.json(privCMsgList);
};