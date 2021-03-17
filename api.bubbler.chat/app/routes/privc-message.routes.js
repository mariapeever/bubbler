module.exports = app => {
	const utils = require("../utils/func");

	const privCMessagesController = require('../controllers/privc-message.view.controller');
	const privCMessagesValidator = require('../validators/privc-message.validator');
	var router = require('express').Router();
	
	// Create a message
	router.post('/', 
		utils.reqAuth, 
		privCMessagesValidator.create, 
		privCMessagesController.create
	);

	// add routes

	app.use('/api/privc-messages', router);
};