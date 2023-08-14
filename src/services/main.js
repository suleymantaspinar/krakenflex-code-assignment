const logger = require('../utils/logger');

const OutageService = require('../services/outage');

const { interviewMockApi: { siteId } } = require('../config');

module.exports = class MainService {
  static async start () {
    logger.info('Service is started');
    try {
      const { outages } = await OutageService.getSiteOutages({ siteId });
      logger.info(`${outages.length} outages found.`);

      const { success } = await OutageService.addSiteOutages({ siteId, outages });

      if (success) {
        logger.info(`${outages.length} outages added succesfully.`);
      }
    } catch (error) {
      logger.error(`Error is occured, couldn't add outages ${error?.message}`);
      logger.error('Service is shutting down.');
    }
  }
};
