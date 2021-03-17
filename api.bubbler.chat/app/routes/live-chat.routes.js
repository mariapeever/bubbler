module.exports = app => {
	const utils = require("../utils/func");

	const liveChatsController = require('../controllers/live-chat.view.controller');
	const liveChatsValidator = require('../validators/live-chat.validator');

	var router = require('express').Router();
	
	// add routes	

	app.use('/api/live-chats', router);
};