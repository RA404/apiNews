const userRouter = require('express').Router();

const findMe = require('../controllers/users');

userRouter.get('/me', findMe);

module.exports = userRouter;
