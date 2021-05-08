// Auth view controller
const { 
	findOneAuth,
	findOneAuthByUsername,
	findOneAndUpdateAuth,
	findOneAndDeleteAuth
} = require("./auth.model.controller");

const { 
	findOneUser,
	findOneAndDeleteUser } = require("./user.model.controller");

exports.login = async (req, res) => {
	var username = req.sanitize(req.body.username);
	var auth = await findOneAuthByUsername(username, res);
	if (auth) {

		const bcrypt = require('bcrypt');
		var plainPassword = req.sanitize(req.body.password);

		var hashedPassword = auth.password;
		// compare passwords
		bcrypt.compare(plainPassword, hashedPassword)
			.then(async result => {
				if (!result) {
					res.status(404).send({ message: 'Wrong password' });
				} else {
					req.session.authId = auth._id;
					// const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

					var user = await findOneUser(auth.user)
						.then(user => {
							user._doc.username = auth.username;
							return user;
						});
					if (user) {
						res.json(user);
					} else {
						res.status(404).send({ message: 'User not found.' });
					}
				}
		});
	} else {
		res.status(404).json({ message: 'Username not found.' });
	}
	
};

exports.logout = (req, res) => {

	// delete nonce_tokens.userId;
	req.session.destroy(err => {
		try {
			res.json('Logged out.');
		} catch (err) {
			res.status(500).json({ message: 'Error.' });
		}
  });
};

exports.findOne = async (req, res) => {

	var id = req.sanitize(req.params.id);
	var auth = await findOneAuth(id, res);
	try {
		if (!auth) throw 'Account not found';
		res.json(auth);
	} catch (err) {
		res.status(404).json({ message: err });
	}
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
		try {
			if (!auth) throw 'Account not found.'
			res.json(auth);
		} catch (err) {
			res.status(404).json({ message: err });
		}
		
	});
};

exports.deleteOne = async (req, res) => {
	
	var id = req.sanitize(req.params.id);
	var auth = await findOneAndDeleteAuth(id, res);
	try {
		if (!auth) throw 'Account not found.'
		findOneAndDeleteUser(auth.user, res);
		res.json('User deleted.');
	} catch {
		res.status(404).json({ message: err })
	}
};










































 