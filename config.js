module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/newsdb';
module.exports.JWT_SECRET = process.env.JWT_SECRET || 'some-secret-key';
module.exports.NODE_ENV = process.env.NODE_ENV || 'develop';
