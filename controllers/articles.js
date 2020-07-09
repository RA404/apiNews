const articlesModel = require('../models/articles');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.findAll = (req, res, next) => {
  articlesModel.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticles = (req, res, next) => {
  articlesModel.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  })
    .orFail(() => new ErrorNotFound({ message: `Article with id '${req.params.id}' not found or you haven't permissions to delete this article` }))
    .then(() => res.send({ message: 'Article deleted successfully' }))
    .catch(next);
};

module.exports.createArticles = (req, res, next) => {
  const {
    title,
    text,
    keyword,
    date,
    source,
    link,
    image,
  } = req.body;
  articlesModel.create({
    title,
    text,
    keyword,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
