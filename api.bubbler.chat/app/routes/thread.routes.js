module.exports = app => {
	
	const threadsController = require('../controllers/thread.view.controller');

	var router = require('express').Router();
		
	// add routes

	app.use('/api/threads', router);
};