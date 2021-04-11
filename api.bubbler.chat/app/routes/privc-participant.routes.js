module.exports = app => {
	const utils = require("../utils/func");

	const privCParticipantsController = require('../controllers/privc-participant.view.controller');
	const privCParticipantsValidator = require('../validators/privc-participant.validator');
	var router = require('express').Router();
	
	// Create a user
	// Find users by ids
	router.get('/find', utils.reqAuth, privCParticipantsValidator.find, privCParticipantsController.find);
	// Find active users (accepts comma separated ids, e.g. ?ids=ID,ID)
	// router.get('/active', utils.reqAuth, privateChatsValidator.findActive, privateChatsController.findActive);
	// Find a single user by id
	router.get('/:id', utils.reqAuth, privCParticipantsValidator.findOne, privCParticipantsController.findOne);
	// Update a single user by id
	router.put('/update/:id', utils.reqAuth, privCParticipantsValidator.updateOne, privCParticipantsController.updateOne);

	// add routes

	app.use('/api/privc-participants', router);
};