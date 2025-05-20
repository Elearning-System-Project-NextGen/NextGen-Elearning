const { t } = require("i18next");

const restrictTo = (...roles) => {
  return (req, res, next) => {
    
    console.log(req.user.role);
    console.log("req.user:", req.user);
    console.log("Expected roles:", roles);

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: t("forbidden") });
    }
    next();
  };
};

module.exports = restrictTo;
