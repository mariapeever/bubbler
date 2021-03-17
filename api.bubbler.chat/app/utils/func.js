

exports.reqAuth = (req, res, next) => {
	if (!req.session.authId) {
  		res.send('Not authorised.');
	} else {
	  	next();
	}
}