// User
module.exports = app => {
	// controller
	const utils = require("../utils/func");

	const usersController = require('../controllers/user.view.controller');
	// validators
	const usersValidator = require('../validators/user.validator');
	const authsValidator = require('../validators/auth.validator');
	// router
	var router = require('express').Router();

	// Create a user
	router.post('/', [authsValidator.create, usersValidator.create], usersController.create);
	// Find users by ids
	router.get('/find', utils.reqAuth, usersValidator.find, usersController.find);

	router.get('/regex', utils.reqAuth, usersValidator.find, usersController.find);
	// Find active users (accepts comma separated ids, e.g. ?ids=ID,ID)
	router.get('/active', utils.reqAuth, usersValidator.findActive, usersController.findActive);
	// Find a single user by id
	router.get('/:id', utils.reqAuth, usersValidator.findOne, usersController.findOne);
	// Update a single user by id
	router.put('/update/:id', utils.reqAuth, usersValidator.updateOne, usersController.updateOne);

	app.use('/api/users', router);
};