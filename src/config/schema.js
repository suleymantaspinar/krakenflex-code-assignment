const Joi = require('../utils/joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  version: Joi.string().min(5).required(),
  env: Joi.string().required(),
  interviewMockApi: {
    url: Joi.string().required(),
    apiKey: Joi.string().required(),
    siteId: Joi.string().required(),
    dateLimit: Joi.date().required()
  }
});
