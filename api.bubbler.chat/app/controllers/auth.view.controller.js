// Auth view controller
const { 
	findOneAuth,
	findOneAuthByUsername,
	findOneAndUpdateAuth,
	findOneAndDeleteAuth
} = require("./auth.model.controller");

const { findOneUser,
				findOneAndDeleteUser } = require("./user.model.controller");

exports.login = async (req, res) => {
	console.log('test');
	const bcrypt = require('bcrypt');
	var plainPassword = req.sanitize(req.body.password);

	var username = req.sanitize(req.body.username);
	var auth = await findOneAuthByUsername(username, res);
	var hashedPassword = auth.password;
	console.log('test');
	// compare passwords
  bcrypt.compare(plainPassword, hashedPassword)
  	.then(async result => {
  		if (!result) res.status(404).send({ message: 'Wrong password' });
			req.session.authId = auth._id;
			// const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  	// 	console.log(ip); // ip address of the user
  		var user = await findOneUser(auth.user)
  			.then(user => {
  				user._doc.username = auth.username
  				return user
  			});

      	res.json(user);
  });
};

exports.logout = (req, res) => {

	// delete nonce_tokens.userId;
	req.session.destroy(err => {
		try {
			res.send('Logged out.');
		} catch (err) {
			res.status(500).send({ message: 'Error.' });
		}
  });
};

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var auth = await findOneAuth(id, res);
	res.json(auth);
};

exports.updateOne = async (req, res) => {

	const bcrypt = require('bcrypt');
	const saltRounds = 10;

	var plainPassword = req.sanitize(req.body.password);

	// hash the password and save user data
	bcrypt.hash(plainPassword, saltRounds, async (err, hashedPassword) => {
		if (err) throw err;
		var id = req.sanitize(req.params.id);
		var auth = await findOneAndUpdateAuth(id, {
			username: req.sanitize(req.body.username),
			password: hashedPassword
		}, res);
		res.json(auth);
	});
};

exports.deleteOne = async (req, res) => {
	
	var id = req.sanitize(req.params.id);
	var auth = await findOneAndDeleteAuth(id, res);
	await findOneAndDeleteUser(auth.user, res);
	res.send('User deleted.');
	
};

