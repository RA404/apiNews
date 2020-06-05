const signupRouter = require('express').Router();
const joi = require('@hapi/joi');

const { createUser } = require('../controllers/users');

const schemaSignUp = require('../schemas/signup');

// eslint-disable-next-line no-shadow
const validate = (schemaSignUp) => (req, res, next) => {
  joi.validate(req.body, schemaSignUp)
    .then(() => next())
    .catch(next);
};

signupRouter.post('/', validate(schemaSignUp), createUser);

module.exports = signupRouter;
