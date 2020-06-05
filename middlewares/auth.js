const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { JWT_SECRET } = require('../config');


const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

// eslint-disable-next-line consistent-return
module.exports.auth = async (req, res, next) => {
  try {
    if (req.cookies.jwt === undefined) {
      throw new ErrorUnauthorized({ message: 'Sign in to your account' });
    }

    const data = await verifyToken(req.cookies.jwt);

    if (!data) {
      throw new ErrorUnauthorized({ message: 'Sign in to your account' });
    }
    const user = await userModel.findById(data._id);
    if (!user) {
      throw new ErrorUnauthorized({ message: 'Sign in to your account' });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
