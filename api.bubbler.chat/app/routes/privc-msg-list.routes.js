// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const privCMsgListsController = require('../controllers/privc-msg-list.view.controller');
	// validators
	const privCMsgListsValidator = require('../validators/privc-msg-list.validator');
	// router
	var router = require('express').Router();

	// // Create a privCList
	// router.post('/', privCListsValidator.create, privCListsController.create);
	
	// Find a single privCList by id
	router.get('/:id', utils.reqAuth, privCMsgListsValidator.findOne, privCMsgListsController.findOne);

	// Update a single privCList by id
	// router.put('/update/:id', utils.reqAuth, privCMsgListsValidator.updateOne, privCMsgListsController.updateOne);

	app.use('/api/privc-msg-lists', router);
};