const db = require("../models");

const PrivCParticipant = db.privCParticipants;

exports.createPrivCParticipant = async (obj, res) => {

	var participant = new PrivCParticipant(obj);
	// save admin
	return await participant.save()
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOnePrivCParticipant = async (id, res) => {

	return await PrivCParticipant.findById(id)
		.then(partic => {
			try {
				if (!partic) throw 'Participant not found.';
				return partic;
			} catch {
				return false;
			}	
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
}

exports.findPrivCParticipants = async (ids, res) => {
	
	var cond = { _id: { $in: ids } };
	return await PrivCParticipant.find(cond)
		.then(participants => {
			try {
				if (!participants) throw 'Private chat participants not found.';
				return participants;
			} catch {
				return false;
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};




































