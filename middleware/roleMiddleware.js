const { t } = require("i18next");

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: t("forbidden") });
    }
    next();
  };
};

module.exports = restrictTo;
