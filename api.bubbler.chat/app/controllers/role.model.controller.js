const db = require("../models");

const Role = db.roles;

exports.createRole = async (obj, res) => {
	var role = new Role(obj);
	return await role.save()
		.catch(err => {
			res.status(500).send({ message: err });
		});
}

