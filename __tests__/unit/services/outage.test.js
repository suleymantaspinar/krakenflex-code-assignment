/* eslint-disable no-undef */
const OutageService = require('../../../src/services/outage');

const OutageServiceCaller = require('../../../src/service-callers/outage');
const SiteService = require('../../../src/services/site');

jest.mock('../../../src/service-callers/outage', () => (
  {
    getOutages: jest.fn(),
    addSiteOutages: jest.fn()
  }
));

jest.mock('../../../src/services/site', () => (
  {
    getSiteInfo: jest.fn()
  }
));

const {
  SITE_NOT_FOUND_ERROR,
  SITE_ID_IS_REQUIRED_ERROR,
  SITE_DEVICE_NOT_FOUND_ERROR,
  SITE_OUTAGE_NOT_FOUND_ERROR
} = require('../../../src/constants');

describe('Outage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should be exist', () => {
    expect(OutageService).toBeDefined();
  });

  describe('getSiteOutages', () => {
    it('should throw error when siteId is empty', async () => {
      const mockSiteId = undefined;
      await expect(OutageService.getSiteOutages({
        mockSiteId
      }))
        .rejects
        .toEqual(new Error(SITE_ID_IS_REQUIRED_ERROR));
    });
    it('should throw error when siteInfo is not found', async () => {
      const mockSiteInfo = undefined;
      const mockSiteId = 123;

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      await expect(OutageService.getSiteOutages({
        siteId: mockSiteId
      }))
        .rejects
        .toEqual(new Error(SITE_NOT_FOUND_ERROR));
    });

    it('should throw error when siteInfo has no devices', async () => {
      const mockSiteInfo = { devices: [] };
      const mockSiteId = 123;

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      await expect(OutageService.getSiteOutages({
        siteId: mockSiteId
      }))
        .rejects
        .toEqual(new Error(SITE_DEVICE_NOT_FOUND_ERROR));
    });

    it('should throw error when siteInfo has no devices field', async () => {
      const mockSiteInfo = { };
      const mockSiteId = 123;

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      await expect(OutageService.getSiteOutages({
        siteId: mockSiteId
      }))
        .rejects
        .toEqual(new Error(SITE_DEVICE_NOT_FOUND_ERROR));
    });

    it('should throw error when there is no outage', async () => {
      const mockSiteInfo = {
        devices: [{
          id: 'testDevice'
        }]
      };
      const mockSiteId = 123;

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      OutageServiceCaller.getOutages.mockReturnValue([]);

      await expect(OutageService.getSiteOutages({
        siteId: mockSiteId
      }))
        .rejects
        .toEqual(new Error(SITE_OUTAGE_NOT_FOUND_ERROR));
    });

    it('should throw error when outages is empty', async () => {
      const mockSiteInfo = {
        devices: [{
          id: 'testDevice'
        }]
      };
      const mockSiteId = 123;

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      OutageServiceCaller.getOutages.mockReturnValue();

      await expect(OutageService.getSiteOutages({
        siteId: mockSiteId
      }))
        .rejects
        .toEqual(new Error(SITE_OUTAGE_NOT_FOUND_ERROR));
    });

    it('should call site service', async () => {
      const mockSiteInfo = {
        devices: [{
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1'
        }]
      };
      const mockSiteId = 123;
      const mockOutages = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2021-07-26T17:09:31.036Z',
        end: '2021-08-29T00:37:42.253Z'
      }];

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      OutageServiceCaller.getOutages.mockReturnValue(mockOutages);

      await OutageService.getSiteOutages({ siteId: mockSiteId });

      expect(SiteService.getSiteInfo).toHaveBeenCalledTimes(1);
      expect(SiteService.getSiteInfo).toHaveBeenCalledWith({
        siteId: mockSiteId
      });
    });

    it('should call outage service', async () => {
      const mockSiteInfo = {
        devices: [{
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1'
        }]
      };
      const mockSiteId = 123;
      const mockOutages = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2021-07-26T17:09:31.036Z',
        end: '2021-08-29T00:37:42.253Z'
      }];

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      OutageServiceCaller.getOutages.mockReturnValue(mockOutages);

      await OutageService.getSiteOutages({ siteId: mockSiteId });

      expect(OutageServiceCaller.getOutages).toHaveBeenCalledTimes(1);
      expect(OutageServiceCaller.getOutages).toHaveBeenCalledWith();
    });

    it('should filter outages by date and id', async () => {
      const mockSiteInfo = {
        devices: [{
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1'
        }]
      };
      const mockSiteId = 123;
      const mockOutages = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2025-07-26T17:09:31.036Z',
        end: '2021-08-29T00:37:42.253Z'
      }];

      const expectedResult = [{
        name: 'Battery 1',
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: '2025-07-26T17:09:31.036Z',
        end: '2021-08-29T00:37:42.253Z'
      }];

      SiteService.getSiteInfo.mockReturnValue({ siteInfo: mockSiteInfo });
      OutageServiceCaller.getOutages.mockReturnValue(mockOutages);

      const { outages } = await OutageService.getSiteOutages({ siteId: mockSiteId });

      expect(outages).toBeDefined();
      expect(outages).toStrictEqual(expectedResult);
    });
  });
});
