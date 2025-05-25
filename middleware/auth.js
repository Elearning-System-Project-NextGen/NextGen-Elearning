const jwt = require("jsonwebtoken");
const { t } = require("i18next");

const authMiddleware = async (req, res, next) => {
  try {
    // Prioritize the httpOnly cookie over the header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ error: t("unauthorized") });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: t("invalid_token") });
  }
};

module.exports = authMiddleware;
