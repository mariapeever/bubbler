
const {check, query, param, oneOf, validationResult} = require('express-validator');

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
exports.updateOne = [param('id').isMongoId(),
  (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];