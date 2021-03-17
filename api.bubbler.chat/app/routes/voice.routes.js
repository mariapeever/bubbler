module.exports = app => {
	const voiceController = require('../controllers/voice.view.controller');

	var router = require('express').Router();
	
	// add routes

	app.use('/api/voice', router);
};