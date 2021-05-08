module.exports = app => {
	const utils = require("../utils/func");

	const privCMessagesController = require('../controllers/privc-message.view.controller');
	const privCMessagesValidator = require('../validators/privc-message.validator');

	var router = require('express').Router();
	// Create a message
	router.post('/', privCMessagesValidator.create, privCMessagesController.create);
	// Find messages by ids
	router.get('/find', utils.reqAuth, privCMessagesValidator.find, privCMessagesController.find);
	// Find active messages (accepts comma separated ids, e.g. ?ids=ID,ID)
	// router.get('/active', utils.reqAuth, privateChatsValidator.findActive, privateChatsController.findActive);
	// Find a single message by id
	router.get('/:id', utils.reqAuth, privCMessagesValidator.findOne, privCMessagesController.findOne);
	// Update a single message by id
	router.put('/update/:id', utils.reqAuth, privCMessagesValidator.updateOne, privCMessagesController.updateOne);

	// add routes

	app.use('/api/privc-messages', router);
};