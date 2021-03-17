// Private chat messages list model controller
const db = require('../models');
const PrivCMessagesList = db.privCMessagesLists;

exports.createPrivCMessagesList = async (obj, res) => {
	var privCMessagesList = new PrivCMessagesList(obj);
	return await privCMessagesList.save()
		.catch(err => {
			res.status(500).send({ message: err });
		});
};

exports.findOnePrivCMessagesList = async (id, res) => {
	return await PrivCMessagesList.findById(id)
		.then(list => {
			try{
				if (!list) throw 'Messages list not found';
				return list;
			} catch {
				res.status(404).send({ message: err });
			}
		})
			.catch(err => {
				res.staus(500).send({ message: err });
			});
};



