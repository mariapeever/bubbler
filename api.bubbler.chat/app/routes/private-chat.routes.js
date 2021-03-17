module.exports = app => {
	const utils = require("../utils/func");

	const privateChatsController = require('../controllers/private-chat.view.controller');
	const privateChatsValidator = require('../validators/private-chat.validator');

	var router = require('express').Router();

	// create
	router.post('/', utils.reqAuth, privateChatsValidator.create, privateChatsController.create);

	app.use('/api/private-chats', router);
};