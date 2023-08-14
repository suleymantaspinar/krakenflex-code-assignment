/* eslint-disable no-undef */
const MainService = require('../../../src/services/main');

const OutageService = require('../../../src/services/outage');

jest.mock('../../../src/services/outage', () => (
  {
    getSiteOutages: jest.fn(),
    addSiteOutages: jest.fn()
  }
));

describe('Main Service', () => {
  it('Should be exist', () => {
    expect(MainService).toBeDefined();
  });

  describe('start', () => {
    it('should call getSiteOutages', async () => {
      OutageService.getSiteOutages.mockReturnValue({});

      await MainService.start();

      expect(OutageService.getSiteOutages).toHaveBeenCalledTimes(1);
    });

    it('should call addSiteOutages', async () => {
      const mockOutages = [{ siteId: '1234' }];

      OutageService.getSiteOutages.mockReturnValue({ outages: mockOutages });
      OutageService.addSiteOutages.mockReturnValue({ success: true });

      await MainService.start();

      expect(OutageService.addSiteOutages).toHaveBeenCalledTimes(1);
      expect(OutageService.addSiteOutages).toHaveBeenCalledWith({
        outages: mockOutages,
        siteId: process.env.KRAKENFLEX_SITE_ID
      });
    });
  });
});
