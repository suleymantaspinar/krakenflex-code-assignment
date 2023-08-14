const { retryPromise } = require('../utils/retry-promise');
const ServiceCaller = require('../utils/service-caller');

const { interviewMockApi } = require('../config');

module.exports = class SiteInfoServiceCaller {
  static async getSiteInfo ({ siteId }) {
    const { url, apiKey } = interviewMockApi;

    return retryPromise(
      () => ServiceCaller.request(
        {
          url,
          method: 'GET',
          path: `site-info/${siteId}`,
          headers: {
            'x-api-key': apiKey
          }
        }
      )
    );
  }
};
