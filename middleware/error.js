const i18next = require("../config/i18n");

class ErrorMiddleware {
  static handle(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: i18next.t("serverError", { error: err.message }),
    });
  }
}

module.exports = ErrorMiddleware;
