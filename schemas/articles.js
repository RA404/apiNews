const joi = require('joi');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

module.exports = joi.object().keys({
  title: joi.string()
    .required()
    .error(() => new ErrorBadRequest({ message: 'The title field must be of string type' })),
  keyword: joi.string()
    .required()
    .error(() => new ErrorBadRequest({ message: 'The keyword field must be of string type' })),
  text: joi.string()
    .required()
    .error(() => new ErrorBadRequest({ message: 'The text field must be of string type' })),
  source: joi.string()
    .required()
    .error(() => new ErrorBadRequest({ message: 'The source field must be of string type' })),
  link: joi.string()
    .required()
    .uri()
    .regex(urlPattern)
    .error(() => new ErrorBadRequest({ message: 'Invalid link url' })),
  image: joi.string()
    .required()
    .uri()
    .regex(urlPattern)
    .error(() => new ErrorBadRequest({ message: 'Invalid image url' })),
  owner: joi.string(),
  date: joi.string()
    .required()
    .error(() => new ErrorBadRequest({ message: 'The date field must be of string type' })),
});
