const db = require("../models");

const PrivCParticipantsList = db.privCParticipantsLists;

exports.createPrivCParticipantsList = async (obj, res) => {
	var privCParticipantsList = new PrivCParticipantsList(obj);

	return await privCParticipantsList.save(privCParticipantsList)
		.catch(err => {
			res.status(500).send({ message: err });
		});
};




