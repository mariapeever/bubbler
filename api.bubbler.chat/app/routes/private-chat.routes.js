// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const privateChatsController = require('../controllers/private-chat.view.controller');
	// validators
	const privateChatsValidator = require('../validators/private-chat.validator');
	// router
	var router = require('express').Router();

	// Create a user
	router.post('/', privateChatsValidator.create, privateChatsController.create);
	// Find users by ids
	router.get('/find', utils.reqAuth, privateChatsValidator.find, privateChatsController.find);
	// Find active users (accepts comma separated ids, e.g. ?ids=ID,ID)
	// router.get('/active', utils.reqAuth, privateChatsValidator.findActive, privateChatsController.findActive);
	// Find a single user by id
	router.get('/:id', utils.reqAuth, privateChatsValidator.findOne, privateChatsController.findOne);
	// Update a single user by id
	router.put('/update/:id', utils.reqAuth, privateChatsValidator.updateOne, privateChatsController.updateOne);

	app.use('/api/private-chats', router);
};