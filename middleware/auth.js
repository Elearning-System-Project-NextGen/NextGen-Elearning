const jwt = require("jsonwebtoken");
const { t } = require("i18next");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;
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
