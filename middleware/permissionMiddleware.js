const { t } = require("i18next");

const hasPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (
      !req.user || // User is not authenticated
      !req.user.permissions || // User has no permissions array
      !req.user.permissions.includes(requiredPermission) // User lacks the required permission
    ) {
      return res.status(403).json({ error: t("forbidden") });
    }
    next(); // Permission check passed, proceed to the next middleware or controller
  };
};

module.exports = hasPermission;
