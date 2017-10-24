'use strict';

const winston = require('winston');
const config = require('../config/index')();

const logLevel = (config && config.loggerSettings && config.loggerSettings.logLevel) ? config.loggerSettings.logLevel : 'info';

const loggerConfig = {
  levels: {
    audit: 0,
    error: 1,
    warn: 2,
    info: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: (config && config.loggerSettings && config.loggerSettings.colors) ? config.loggerSettings.colors : null,
};

const logger = new (winston.Logger)({
  levels: loggerConfig.levels,
  colors: loggerConfig.colors,
  transports: [
    new (winston.transports.Console)({ level: logLevel, colorize: true }),
  ],
});

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at:', p, 'reason:', reason);
});

module.exports = logger;
