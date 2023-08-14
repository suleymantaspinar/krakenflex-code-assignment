require('dotenv').config();
const Joi = require('../utils/joi');

const defaultConfig = require('./default');
const configValidationSchema = require('./schema');

const environmentConfig = require(`./environments/${defaultConfig.env}`);

const config = { ...defaultConfig, ...environmentConfig };

Joi.assert(config, configValidationSchema, 'Config validation failed');

module.exports = config;
