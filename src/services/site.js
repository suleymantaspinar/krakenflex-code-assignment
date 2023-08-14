const SiteServiceCaller = require('../service-callers/site');

module.exports = class SiteService {
  static async getSiteInfo ({ siteId }) {
    const siteInfo = await SiteServiceCaller.getSiteInfo({ siteId });

    return {
      siteInfo
    };
  }
};
