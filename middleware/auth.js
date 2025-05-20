const jwt = require("jsonwebtoken");
const { t } = require("i18next");

const authMiddleware = async (req, res, next) => {
  try {
<<<<<<< Updated upstream
    let token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      token = req.cookies.token;
    }
=======
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;
>>>>>>> Stashed changes

    if (!token) {
      return res.status(401).json({ error: t("unauthorized") });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
<<<<<<< Updated upstream
    console.log("auth", req.user.role);
=======
    console.log("Authenticated user:", req.user);
>>>>>>> Stashed changes

    next();
  } catch (error) {
    res.status(401).json({ error: t("invalid_token") });
  }
};

module.exports = authMiddleware;
