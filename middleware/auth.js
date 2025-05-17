const jwt = require('jsonwebtoken');
const i18next = require('../config/i18n');

class AuthMiddleware {
  static authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: i18next.t('unauthorized') });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: i18next.t('invalidToken') });
      }
      req.user = decoded;
      next();
    });
  }
}

module.exports = AuthMiddleware;