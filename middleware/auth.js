const jwt = require("jsonwebtoken");
const { t } = require("i18next");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: t("unauthorized") });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("auth", req.user.role);

    next();
  } catch (error) {
    res.status(401).json({ error: t("invalid_token") });
  }
};

module.exports = authMiddleware;
