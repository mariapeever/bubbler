
const config = require('../config/app.config');

const { 
	createUser, 
	findUsers,
	findOneUser,
	findActiveUsers,
	findOneAndUpdateUser,
	findOneUserByUsername,
	findOneAndDeleteUser 
} = require('./user.model.controller');

const { createAuth } = require('./auth.model.controller');

exports.create = async (req, res) => {

	var username = req.sanitize(req.body.username);
	var checkExistingUsername = await findOneUserByUsername(username, res);
	console.log('checkExistingUsername',checkExistingUsername)
	if (!checkExistingUsername) {
		var plainPassword = req.sanitize(req.body.password);
	
		const bcrypt = require('bcrypt');
	  	const saltRounds = 10;

	 	// hash the password and save user data
		bcrypt.hash(plainPassword, saltRounds, async (err, hashedPassword) => {
			if (err) throw err;

			var firstName = req.sanitize(req.body.firstName);
			var lastName = req.sanitize(req.body.lastName);
			var email = req.sanitize(req.body.email);
			var mobile = req.body.mobile ? req.sanitize(req.body.mobile) : "";
			var dob = req.sanitize(req.body.dob);
			// var image =
			var privacy = config.PRIVACY.USER

			var user = await createUser({ 
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobile: mobile,
				dob: dob,
				status: "pending",
				privacy: 
				{
					firstName: privacy.FIRST_NAME,
					lastName: privacy.LAST_NAME,
					dob: privacy.DOB,
					mobile: privacy.MOBILE,
					email: privacy.EMAIL
				},
		 	}, res);

			

			var auth = await createAuth({ 
				user: user._id,
				username: username,
				password: hashedPassword
			}, res);

			res.json({user});
		});
	} else {
		res.json('Username not available.')
	}
	
};

exports.find = async (req, res) => {
	if (!req.query.ids) {
		return res.status(400).send({
			message: 'Ids must not be empty.'
		});
	}
	var ids = req.query.ids;
	ids = ids.split(',');
	ids.forEach(id => req.sanitize(id));

	var users = await findUsers(ids, res);
	res.json(users);
};

exports.findActive = async (req, res) => {
	if(!req.query.ids) {
		return res.status(400).send({
			message: 'Ids must not be empty.'
		});
	}
	// http://localhost:8000/api/messages/?ids=[6046b4e99b66b743c77ec61c,604592bc897342ee706ff513]
	var ids = req.query.ids;
	ids = ids.split(',');
	ids.forEach(id => req.sanitize(id));

	var cond = { _id: { $in: ids }, status: "active" }; //  'content': { $regex: new RegExp(kwrd), $options: “i” } 
	var users = await findActiveUsers(ids, res);
	res.json(users);
};

exports.findOne = async (req, res) => {
	
	var id = req.sanitize(req.params.id);
	var user = await findOneUser(id, res);
	res.json(user);

};

exports.updateOne = async (req, res) => {

	var userObj = {};
	// sanitize
	for (let [key, val] of Object.entries(req.body)) {
		if(config.FIELDS.USER.includes(key)) {
			userObj[key] = req.sanitize(val);
		}
	}
	
	if (req.body.privacy) {
		userObj.privacy = {};
		for (let [key, val] of Object.entries(req.body.privacy)) {
			if(config.FIELD.USER.includes(key)) {
				userObj.privacy[key] = req.sanitize(val);
			}
	  }
	}
	var id = req.sanitize(req.params.id);
	var user = await findOneAndUpdateUser(id, userObj, res);

	res.json(user);
};

exports.deleteOne = async (req, res) => {

	var id = res.sanitize(req.body.id);
	var user = await findOneAndDeleteUser(id, res);

	res.json(user);
};
