/* eslint-disable no-undef */
const OutageLogic = require('../../../src/logic/outage');

describe('OutageLogic', () => {
  describe('filterOutagesByDateAndId', () => {
    it('should return empty array if there is no outage found with the greater date limit', () => {
      const mockOutages = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2021-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z'
        },
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2022-05-23T12:21:27.377Z',
          end: '2022-11-13T02:16:38.905Z'
        }
      ];

      const mockDevices = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1'
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        name: 'Battery 2'
      }];

      const outages = OutageLogic.filterOutagesByDateAndId({
        outages: mockOutages,
        devices: mockDevices
      });

      expect(outages).toStrictEqual([]);
    });

    it('should return empty array if there is no outages', () => {
      const mockOutages = [];
      const mockDevices = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1'
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        name: 'Battery 2'
      }];

      const outages = OutageLogic.filterOutagesByDateAndId({
        outages: mockOutages,
        devices: mockDevices
      });

      expect(outages).toStrictEqual([]);
    });

    it('should return empty array if there is no devices', () => {
      const mockOutages = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2021-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z'
        },
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2022-05-23T12:21:27.377Z',
          end: '2022-11-13T02:16:38.905Z'
        }
      ];

      const mockDevices = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1'
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        name: 'Battery 2'
      }];

      const outages = OutageLogic.filterOutagesByDateAndId({
        outages: mockOutages,
        devices: mockDevices
      });

      expect(outages).toStrictEqual([]);
    });

    it('should return empty array if there is no deviceId in the given devices list', () => {
      const mockOutages = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2021-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z'
        },
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2022-05-23T12:21:27.377Z',
          end: '2022-11-13T02:16:38.905Z'
        }
      ];

      const mockDevices = [{
        name: 'Battery 1'
      },
      {
        name: 'Battery 2'
      }];

      const outages = OutageLogic.filterOutagesByDateAndId({
        outages: mockOutages,
        devices: mockDevices
      });

      expect(outages).toStrictEqual([]);
    });
    it('should return the site outages when there is devices and outages', () => {
      const mockOutages = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2024-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z'
        },
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2024-05-23T12:21:27.377Z',
          end: '2022-11-13T02:16:38.905Z'
        }
      ];

      const mockDevices = [{
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1'
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        name: 'Battery 2'
      }];

      const expectedOutages = [
        {
          name: 'Battery 1',
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2024-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z'
        },
        {
          name: 'Battery 1',
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2024-05-23T12:21:27.377Z',
          end: '2022-11-13T02:16:38.905Z'
        }
      ];

      const outages = OutageLogic.filterOutagesByDateAndId({
        outages: mockOutages,
        devices: mockDevices
      });

      expect(outages).toStrictEqual(expectedOutages);
    });
  });
});
