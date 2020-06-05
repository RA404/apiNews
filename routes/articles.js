const articlesRouter = require('express').Router();
const joi = require('joi');
const { findAll, deleteCard, createCard } = require('../controllers/articles');
const schemaArticles = require('../schemas/articles');

// eslint-disable-next-line no-shadow
const validate = (schemaCards) => (req, res, next) => {
  joi.validate(req.body, schemaCards)
    .then(() => next())
    .catch(next);
};

articlesRouter.get('/', findAll);
articlesRouter.delete('/:id', deleteCard);
articlesRouter.post('/', validate(schemaArticles), createCard);

module.exports = articlesRouter;
