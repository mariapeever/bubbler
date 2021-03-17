
const { check, param, body, validationResult } = require('express-validator');

exports.create = [[
	check('username')
		.isLength({ min: 6, max: 30 }).withMessage('Username must between 6 and 30 characters long.')
		.custom(value => {
      const db = require('../models/');
      const Auth = db.auths;
      return Auth.findOne({ username: value }).then(auth => {
        if (auth) {
          return Promise.reject('Username already in use.');
        }
      });
    }),
  check('password')
		.isLength({ min: 8, max: 128 }).withMessage('Password must between 8 and 128 characters long.')
		.matches(/\d/).withMessage('Password must contain a number.')
		.matches(/[A-Z]/).withMessage('Password must contain an uppercase character.')
		.matches(/[a-z]/).withMessage('Password must contain a lowercase character.')
		.matches(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/).withMessage('Password must contain a special character.')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.login = [[
	check('username').isLength({ min: 6, max: 30 }).withMessage('Username must between 6 and 30 characters long.'),
  check('password').not().isEmpty().withMessage('Password must not be empty.')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.findOneByUsername = [
	check('username').isLength({ min: 6, max: 30}).withMessage('Username must between 6 and 30 characters long.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.findOne = [
	check('id').isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

// add password must not be the same as prev
exports.updateOne = [[
	param('id').isMongoId(),
	check('username')
		.isLength({ min: 6, max: 30 }).withMessage('Username must between 6 and 30 characters long.')
		.custom(async value => {
      const db = require('../models/');
      const Auth = db.auths;
      Auth.find({username: value})
        .then(auth => {
          if (auth) {
            return Promise.reject('Username already in use.');
          }
        })
          .catch(err => {
            return 'Server error';
          })
    }),
  check('password')
    .isLength({ min: 8, max: 128 }).withMessage('Password must between 8 and 128 characters long.')
    .matches(/\d/).withMessage('Password must contain a number.')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase character.')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase character.')
    .matches(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/).withMessage('Password must contain a special character.')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.deleteOne = [
  check('id').isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];
