const config = require("../config/app.config");

const { 
	findOnePrivCMsgList
} = require('./privc-msg-list.model.controller.js');

exports.findOne = async (req, res) => {
	var id = req.sanitize(req.params.id);
	var privCMsgList = await findOnePrivCMsgList(id, res);
	res.json(privCMsgList);
};