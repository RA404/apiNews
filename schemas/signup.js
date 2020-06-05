const joi = require('@hapi/joi');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports = joi.object().keys({
  name: joi.string().min(2).max(30).required()
    .error(() => new ErrorBadRequest({ message: 'The name must be longer than 2 and less than 30 characters' })),
  email: joi.string().required().email().error(() => new ErrorBadRequest({ message: 'Invalid email' })),
  password: joi.string().min(8).required().error(() => new ErrorBadRequest({ message: 'Password must be longer than 8 character' })),
});
