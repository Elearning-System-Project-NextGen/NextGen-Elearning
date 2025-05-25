const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const SessionController = require("../controllers/SessionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("SESSION_VIEW"),
  SessionController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("SESSION_VIEW_DETAIL"),
  SessionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("SESSION_CREATE"),
  SessionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("SESSION_UPDATE"),
  SessionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("SESSION_DELETE"),
  SessionController.delete
);

module.exports = router;
