const { retryPromise } = require('../utils/retry-promise');
const ServiceCaller = require('../utils/service-caller');

const { interviewMockApi } = require('../config');

module.exports = class OutageServiceCaller {
  static async getOutages () {
    const { url, apiKey } = interviewMockApi;

    return retryPromise(
      () => ServiceCaller.request(
        {
          url,
          method: 'GET',
          path: 'outages',
          headers: {
            'x-api-key': apiKey
          }
        }
      )
    );
  }

  static async addSiteOutages ({ siteId, outages }) {
    const { url, apiKey } = interviewMockApi;

    return retryPromise(
      () => ServiceCaller.request(
        {
          url,
          method: 'POST',
          path: `site-outages/${siteId}`,
          data: outages,
          headers: {
            'x-api-key': apiKey,
            accept: 'application/json'
          }
        }
      )
    );
  }
};
