
const {check, query, param, oneOf, validationResult} = require('express-validator');

exports.create = [[oneOf([
	  check('content').not().isEmpty().withMessage('Content must not be empty.'),
	  check('attachments.images').not().isEmpty().withMessage('Image must not be empty.'),
	  check('attachments.videos').not().isEmpty().withMessage('Video must not be empty.'),
	  check('attachments.links').not().isEmpty().withMessage('Link must not be empty.'),
	  check('attachments.location').not().isEmpty().withMessage('Location must not be empty.'),
	])],
	(req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	    return res.status(422).json({ errors: errors.array() });
	}
	else next();
	}
];

exports.find = [
  query('ids.*').isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.findOne = [
	param('id').isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

// authsValidator.register
// add password must not be the same as prev
exports.updateOne = [[
  param('id').isMongoId(),
  oneOf([
	  check('content').not().isEmpty().withMessage('Content must not be empty.'),
	  check('attachments.images').not().isEmpty().withMessage('Image must not be empty.'),
	  check('attachments.videos').not().isEmpty().withMessage('Video must not be empty.'),
	  check('attachments.links').not().isEmpty().withMessage('Link must not be empty.'),
	  check('attachments.location').not().isEmpty().withMessage('Location must not be empty.'),
	])],
  (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];