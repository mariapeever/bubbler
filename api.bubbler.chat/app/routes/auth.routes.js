module.exports = app => {
	const utils = require("../utils/func");

	const authsController = require('../controllers/auth.view.controller');
	const authsValidator = require('../validators/auth.validator');

	var router = require('express').Router();

	// Login
	router.post('/login', authsValidator.login, authsController.login);
	// Logout
	router.get('/logout', utils.reqAuth, authsController.logout);
	// Find one
	router.get('/:id', utils.reqAuth, authsValidator.findOne, authsController.findOne);
	// Update one
	router.put('/update/:id', utils.reqAuth, authsValidator.updateOne, authsController.updateOne);
	// Delete a single user by auth id
	router.delete('/delete/:id', utils.reqAuth, authsValidator.deleteOne, authsController.deleteOne);

	app.use('/api/auths', router);
};