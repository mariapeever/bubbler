module.exports = app => {
	const utils = require("../utils/func");

	const privCMessagesController = require('../controllers/privc-message.view.controller');
	const privCMessagesValidator = require('../validators/privc-message.validator');
	var router = require('express').Router();
	
	// Create a user
	router.post('/', privCMessagesValidator.create, privCMessagesController.create);
	// Find users by ids
	router.get('/find', utils.reqAuth, privCMessagesValidator.find, privCMessagesController.find);
	// Find active users (accepts comma separated ids, e.g. ?ids=ID,ID)
	// router.get('/active', utils.reqAuth, privateChatsValidator.findActive, privateChatsController.findActive);
	// Find a single user by id
	router.get('/:id', utils.reqAuth, privCMessagesValidator.findOne, privCMessagesController.findOne);
	// Update a single user by id
	router.put('/update/:id', utils.reqAuth, privCMessagesValidator.updateOne, privCMessagesController.updateOne);

	// add routes

	app.use('/api/privc-messages', router);
};