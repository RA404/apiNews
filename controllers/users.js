const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const userModel = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.findMe = (req, res, next) => {
  userModel.findById({ _id: req.user._id })
    .orFail(() => new ErrorNotFound({ message: `User with id '${req.user.id}' not found` }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => userModel.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        // sameSite: true,
        // domain: 'apinews.ra404.ru',
      }).send({ token }).end();
    })
    .catch(next);
};
