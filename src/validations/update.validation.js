const Joi = require('joi');

const postUpdate = {
  body: Joi.object().keys({
    event_type: Joi.string(),
  }),
};

module.exports = {
  postUpdate,
};
