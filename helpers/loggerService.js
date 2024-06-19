const logger = require('../config/log/logger');

exports.logInfo = (message) => {
  logger.info(message);
};

exports.logError = (message) => {
  logger.error(message);
};

exports.logWarning = (message) => {
  logger.warn(message);
};
