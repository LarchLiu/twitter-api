const Joi = require('joi');

const changeTweeps = {
  body: Joi.object().keys({
    event_type: Joi.string(),
    client_payload: Joi.object().keys({
      users: Joi.string().required(),
    }),
  }),
};

module.exports = {
  changeTweeps,
};
