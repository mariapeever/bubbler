// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const privCParticListsController = require('../controllers/privc-partic-list.view.controller');
	// validators
	const privCParticListsValidator = require('../validators/privc-partic-list.validator');
	// router
	var router = require('express').Router();

	// Find a single privCList by id
	router.get('/:id', utils.reqAuth, privCParticListsValidator.findOne, privCParticListsController.findOne);

	app.use('/api/privc-partic-lists', router);
};