const Routes = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const ErrorNotFound = require('../errors/ErrorNotFound');

Routes.use('/users', users);
Routes.use('/articles', articles);
Routes.use('*', () => {
  throw new ErrorNotFound({ message: 'The requested URL was not found on this server.' });
});

module.exports = Routes;
