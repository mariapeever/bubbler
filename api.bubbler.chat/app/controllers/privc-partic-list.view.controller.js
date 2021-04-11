const config = require("../config/app.config");

const { 
	findOnePrivCParticList
} = require('./privc-partic-list.model.controller.js');

exports.findOne = async (req, res) => {
	var id = req.sanitize(req.params.id);
	var privCParticList = await findOnePrivCParticList(id, res);
	res.json(privCParticList);
};