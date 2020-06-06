const mongoose = require('mongoose');
const validator = require('validator');

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  text: {
    type: String,
    minlength: 2,
    required: true,
  },
  keyword: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  date: {
    type: String,
    minlength: 6,
    maxlength: 10,
    required: true,
  },
  source: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('article', articlesSchema);
