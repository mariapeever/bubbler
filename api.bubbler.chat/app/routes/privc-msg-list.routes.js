// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const privCMsgListsController = require('../controllers/privc-msg-list.view.controller');
	// validators
	const privCMsgListsValidator = require('../validators/privc-msg-list.validator');
	// router
	var router = require('express').Router();
	
	// Find a single privCList by id
	router.get('/:id', utils.reqAuth, privCMsgListsValidator.findOne, privCMsgListsController.findOne);

	app.use('/api/privc-msg-lists', router);
};