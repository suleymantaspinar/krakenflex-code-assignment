const axios = require('axios');
const logger = require('./logger');

module.exports = class ServiceCaller {
  static request ({
    url,
    method,
    path,
    data,
    headers
  }) {
    return axios({
      url: `${url}${path}`,
      method,
      data,
      headers
    })
      .then((response) => {
        logger.info('Service Caller response', {
          url: `${url}${path}`,
          method,
          data,
          headers,
          status: response.status
        });
        if (response.status >= 200 && response.status <= 299) {
          return response.data;
        }
      }).catch(error => {
        throw (error);
      });
  }
};
