
const {check, param, query, body, oneOf, validationResult} = require('express-validator');

exports.create = [[
  check('title')
    .not().isEmpty().withMessage('Title must not be empty.')
    .matches(/^[a-zA-Z0-9\s.,`'\-]+$/, 'g').withMessage('First name must be alphanumeric.'),
  check('description')
    .not().isEmpty().withMessage('Description must not be empty.')
    .matches(/^[a-zA-Z0-9\s.,`'\-]+$/, 'g').withMessage('Description must be alphanumeric.')],
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

exports.findActive = [
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

exports.updateOne = [[
  param('id').isMongoId(),
  check('title')
    .not().isEmpty().withMessage('Title must not be empty.')
    .matches(/^[a-zA-Z0-9\s.,`'\-]+$/, 'g').withMessage('First name must be alphanumeric.'),
  check('description')
    .not().isEmpty().withMessage('Description must not be empty.')
    .matches(/^[a-zA-Z0-9\s.,`'\-]+$/, 'g').withMessage('Last name must be alphanumeric.')],
  (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];
