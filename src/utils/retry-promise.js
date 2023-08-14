const logger = require('./logger');

const retryPromise = (fn, retriesLeft = 5, interval = 0) => new Promise((resolve, reject) => {
  fn()
    .then(resolve)
    .catch((error) => {
      setTimeout(() => {
        if (retriesLeft === 1) return reject(error);

        if (error?.response?.status !== 500) {
          return reject(error);
        }

        logger.error(`Will try to fetch ${retriesLeft} time`);

        return retryPromise(fn, retriesLeft - 1, interval).then((resolve, reject));
      }, interval);
    });
});

module.exports = { retryPromise };
