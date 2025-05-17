const logger = require('../helpers/logger');

class ErrorMiddleware {
  static handle(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = ErrorMiddleware;