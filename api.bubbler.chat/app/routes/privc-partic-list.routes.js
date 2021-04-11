// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const privCParticListsController = require('../controllers/privc-partic-list.view.controller');
	// validators
	const privCParticListsValidator = require('../validators/privc-partic-list.validator');
	// router
	var router = require('express').Router();

	// // Create a privCList
	// router.post('/', privCListsValidator.create, privCListsController.create);
	
	// Find a single privCList by id
	router.get('/:id', utils.reqAuth, privCParticListsValidator.findOne, privCParticListsController.findOne);

	// Update a single privCList by id
	// router.put('/update/:id', utils.reqAuth, privCParticListsValidator.updateOne, privCParticListsController.updateOne);

	app.use('/api/privc-partic-lists', router);
};