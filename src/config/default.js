require('dotenv').config();
const pkg = require('../../package.json');

const name = process.env.NAME || pkg.name;
const version = process.env.VERSION || pkg.version;
const env = process.env.NODE_ENV || 'dev';

module.exports = {
  name,
  version,
  env,
  interviewMockApi: {
    url: process.env.KRAKENFLEX_SERVICE_URL,
    apiKey: process.env.KRAKENFLEX_API_KEY,
    siteId: process.env.KRAKENFLEX_SITE_ID,
    dateLimit: process.env.KRAKENFLEX_DATE_LIMIT
  }
};
