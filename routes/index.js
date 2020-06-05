const Routes = require('express').Router();
const users = require('./users');
// const articles = require('./articles');

Routes.use('/users', users);
// Routes.use('/articles', articles);

module.exports = Routes;
