const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, error: message });
};

module.exports = errorHandler;