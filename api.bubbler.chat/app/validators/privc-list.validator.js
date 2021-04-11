
const {param, oneOf, validationResult} = require('express-validator');


exports.findOne = [param('id').isMongoId(),
	(req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	    return res.status(422).json({ errors: errors.array() });
	}
	else next();
	}
];

exports.updateOne = [param('id').isMongoId(),
	(req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	    return res.status(422).json({ errors: errors.array() });
	}
	else next();
	}
];