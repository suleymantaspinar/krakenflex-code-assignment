const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({
      all: true
    }),
    winston.format.timestamp({
      format: 'YY-MM-DD HH:mm:ss'
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});
module.exports = logger;
