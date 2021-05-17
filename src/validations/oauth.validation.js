const Joi = require('joi');

const github = {
  body: Joi.object().keys({
    code: Joi.string().required(),
  }),
};

module.exports = {
  github,
};
