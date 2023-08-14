const { interviewMockApi: { dateLimit } } = require('../config');

module.exports = class OutageLogic {
  static filterOutagesByDateAndId ({
    devices,
    outages
  }) {
    const deviceOutagesMap = {};
    outages
      .filter((outage) => (new Date(outage.begin) >= new Date(dateLimit)))
      .forEach((outage) => {
        if (!deviceOutagesMap[outage.id]) {
          deviceOutagesMap[outage.id] = [{
            begin: outage.begin,
            end: outage.end
          }];
        } else {
          deviceOutagesMap[outage.id].push({
            begin: outage.begin,
            end: outage.end
          });
        }
      });

    const deviceOutages = [];

    devices.forEach((device) => {
      const currentDeviceOutages = deviceOutagesMap[device.id];

      if (currentDeviceOutages) {
        deviceOutages.push(...currentDeviceOutages.map((outage) => ({
          id: device.id,
          name: device.name,
          begin: outage.begin,
          end: outage.end
        })));
      }
    });

    return deviceOutages;
  }
};
