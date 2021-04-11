// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const privCListsController = require('../controllers/privc-list.view.controller');
	// validators
	const privCListsValidator = require('../validators/privc-list.validator');
	// router
	var router = require('express').Router();

	// // Create a privCList
	// router.post('/', privCListsValidator.create, privCListsController.create);
	
	// Find a single privCList by id
	router.get('/:id', utils.reqAuth, privCListsValidator.findOne, privCListsController.findOne);

	// Update a single privCList by id
	router.put('/update/:id', utils.reqAuth, privCListsValidator.updateOne, privCListsController.updateOne);

	app.use('/api/privCLists', router);
};