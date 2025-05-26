const express = require("express");
const authMiddleware = require("../middleware/auth");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);

module.exports = router;
