const db = require("../models");

const Role = db.roles;

exports.createRole = async (obj, res) => {
	var role = new Role(obj);
	return await role.save()
		.catch(err => {
			return res.status(500).send({ message: err });
		});
}

exports.findOneRoleByName = async (name, res) => {

	return await Role.findOne({ name: name })
		.then(role => {
			try {
				if (!role) throw `Role ${name} not found.`;
				return role;
			} catch (err) {
				return false;
			}
		})
			.catch(err => {
				res.status(500).send({ message: err });
			});
}

