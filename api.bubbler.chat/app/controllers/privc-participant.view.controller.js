// Private chat mesasge view controller
const { 
	findOnePrivCParticipant,
	findPrivCParticipants,
	findOneAndUpdatePrivCParticipant
} = require('./privc-participant.model.controller');

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var privCParticipant = await findOnePrivCParticipant(id, res);
	res.json(privCParticipant);
};

exports.find = async (req, res) => {
	
	var ids = req.query.ids;
	ids = ids.split(',');
	ids.forEach(id => req.sanitize(id));

	var privCParticipants = await findPrivCParticipants(ids, res);
	res.json(privCParticipants);
};

exports.updateOne = async (req, res) => {

	var privCParticipantObj = {};
	// sanitize
	for (let [key, val] of Object.entries(req.body)) {
		if(config.FIELDS.PRIVC_MESSAGE.includes(key)) {
			privCParticipantObj[key] = req.sanitize(val);
		}
	}
	
	var id = req.sanitize(req.params.id);
	var privCParticipant = await findOneAndUpdatePrivCParticipant(id, privCParticipantObj, res);

	res.json(privCParticipant);
};

