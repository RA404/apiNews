const articlesRouter = require('express').Router();
const joi = require('joi');
const { findAll, deleteArticles, createArticles } = require('../controllers/articles');
const schemaArticles = require('../schemas/articles');

const validate = (schema) => (req, res, next) => {
  joi.validate(req.body, schema)
    .then(() => next())
    .catch(next);
};

articlesRouter.get('/', findAll);
articlesRouter.delete('/:id', deleteArticles);
articlesRouter.post('/', validate(schemaArticles), createArticles);

module.exports = articlesRouter;
