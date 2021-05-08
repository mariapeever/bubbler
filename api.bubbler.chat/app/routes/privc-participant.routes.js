module.exports = app => {
	const utils = require("../utils/func");

	const privCParticipantsController = require('../controllers/privc-participant.view.controller');
	const privCParticipantsValidator = require('../validators/privc-participant.validator');
	var router = require('express').Router();
	
	// Create a participant
	// Find participants by ids
	router.get('/find', utils.reqAuth, privCParticipantsValidator.find, privCParticipantsController.find);
	// Find a single participant by id
	router.get('/:id', utils.reqAuth, privCParticipantsValidator.findOne, privCParticipantsController.findOne);
	// Update a single participant by id
	router.put('/update/:id', utils.reqAuth, privCParticipantsValidator.updateOne, privCParticipantsController.updateOne);

	// add routes
	app.use('/api/privc-participants', router);
};