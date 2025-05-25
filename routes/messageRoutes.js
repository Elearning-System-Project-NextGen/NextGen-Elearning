const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("MESSAGE_VIEW"),
  MessageController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("MESSAGE_VIEW_DETAIL"),
  MessageController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher", "student"),
  hasPermission("MESSAGE_CREATE"),
  MessageController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher", "student"),
  hasPermission("MESSAGE_UPDATE"),
  MessageController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher", "student"),
  hasPermission("MESSAGE_DELETE"),
  MessageController.delete
);

module.exports = router;
