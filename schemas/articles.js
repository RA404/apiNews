const joi = require('joi');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports = joi.object().keys({
  title: joi.string()
    .required()
    .min(2)
    .max(100)
    .error(() => new ErrorBadRequest({ message: 'The title field must be longer than 2 and less than 100 characters' })),
  keyword: joi.string()
    .required()
    .min(2)
    .max(50)
    .error(() => new ErrorBadRequest({ message: 'The keyword field must be longer than 2 and less than 50 characters' })),
  text: joi.string()
    .required()
    .min(2)
    .error(() => new ErrorBadRequest({ message: 'The text field must be longer than 2' })),
  source: joi.string()
    .required()
    .min(2)
    .max(50)
    .error(() => new ErrorBadRequest({ message: 'The source field must be longer than 2 and less than 50 characters' })),
  link: joi.string()
    .required()
    .uri()
    .error(() => new ErrorBadRequest({ message: 'Invalid link url' })),
  image: joi.string()
    .required()
    .uri()
    .error(() => new ErrorBadRequest({ message: 'Invalid image url' })),
  owner: joi.string(),
  date: joi.string()
    .required()
    .min(6)
    .max(10)
    .error(() => new ErrorBadRequest({ message: 'The date field must be longer than 6 and less than 10 characters' })),
});
