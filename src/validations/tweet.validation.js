const Joi = require('joi');

const getTweets = {
  query: Joi.object().keys({
    limit: Joi.string(),
    page: Joi.string(),
    username: Joi.string(),
    sortBy: Joi.string(),
  }),
};

module.exports = {
  getTweets,
};
