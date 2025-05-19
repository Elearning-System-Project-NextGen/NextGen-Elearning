const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, MessageController.index);
router.get("/:id", authMiddleware, MessageController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher", "student"),
  MessageController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher", "student"),
  MessageController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher", "student"),
  MessageController.delete
);

module.exports = router;
