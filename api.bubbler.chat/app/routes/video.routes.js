module.exports = app => {
	const videosController = require('../controllers/video.view.controller');

	var router = require('express').Router();

	// Add routes

	app.use('/api/videos', router);
};