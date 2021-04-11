const db = require("../models");

const PrivCParticipant = db.privCParticipants;

exports.createPrivCParticipant = async (obj, res) => {

	var privCAdmin = new PrivCParticipant(obj);
	// save admin
	return await privCAdmin.save()
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
				res.status(404).send({ message: err });
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
				res.status(404).send({ message: 'Not found' });
			}
			return data
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
};