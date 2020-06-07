const signupRouter = require('express').Router();
const joi = require('joi');

const { createUser } = require('../controllers/users');

const schemaSignUp = require('../schemas/signup');

const validate = (schema) => (req, res, next) => {
  joi.validate(req.body, schema)
    .then(() => next())
    .catch(next);
};

signupRouter.post('/', validate(schemaSignUp), createUser);

module.exports = signupRouter;
