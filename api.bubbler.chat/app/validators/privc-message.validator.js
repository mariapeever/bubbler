
const {check, oneOf, validationResult} = require('express-validator');

exports.create = [[oneOf([
	  check('content').not().isEmpty().withMessage('Content must not be empty.'),
	  check('attachments.images').not().isEmpty().withMessage('Image must not be empty.'),
	  check('attachments.videos').not().isEmpty().withMessage('Video must not be empty.'),
	  check('attachments.links').not().isEmpty().withMessage('Link must not be empty.'),
	  check('attachments.links').not().isEmpty().withMessage('Link must not be empty.'),
	]),
	check('content')
	  .matches(/^[A-z0-9À-ž\s']+$/, 'g').withMessage('Content must be alphanumeric.')
	],
	(req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	    return res.status(422).json({ errors: errors.array() });
	}
	else next();
	}
];