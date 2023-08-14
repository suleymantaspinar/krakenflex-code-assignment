const SiteService = require('../services/site');

const OutageServiceCaller = require('../service-callers/outage');

const OutageLogic = require('../logic/outage');

const {
  SITE_NOT_FOUND_ERROR,
  SITE_ID_IS_REQUIRED_ERROR,
  SITE_DEVICE_NOT_FOUND_ERROR,
  SITE_OUTAGE_NOT_FOUND_ERROR
} = require('../constants');

module.exports = class OutageService {
  static async getSiteOutages ({ siteId }) {
    if (!siteId) {
      throw new Error(SITE_ID_IS_REQUIRED_ERROR);
    }

    const { siteInfo } = await SiteService.getSiteInfo({ siteId });

    if (!siteInfo) {
      throw new Error(SITE_NOT_FOUND_ERROR);
    }

    if (siteInfo?.devices?.length <= 0 || !siteInfo.devices) {
      throw new Error(SITE_DEVICE_NOT_FOUND_ERROR);
    }

    const outages = await OutageServiceCaller.getOutages();

    if (outages?.length <= 0 || !outages) {
      throw new Error(SITE_OUTAGE_NOT_FOUND_ERROR);
    }

    const outagesOfSiteInformation = OutageLogic.filterOutagesByDateAndId({
      outages,
      devices: siteInfo.devices
    });

    return {
      outages: outagesOfSiteInformation
    };
  }

  static async addSiteOutages ({ siteId, outages }) {
    if (!siteId) {
      throw new Error(SITE_ID_IS_REQUIRED_ERROR);
    }

    if (outages?.length <= 0 || !outages) {
      throw new Error(SITE_OUTAGE_NOT_FOUND_ERROR);
    }

    await OutageServiceCaller.addSiteOutages({ siteId, outages });

    return {
      success: true
    };
  }
};
