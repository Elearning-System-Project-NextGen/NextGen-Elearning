const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const LessonController = require("../controllers/LessonController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("LESSON_VIEW"),
  LessonController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("LESSON_VIEW_DETAIL"),
  LessonController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("LESSON_CREATE"),
  LessonController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("LESSON_UPDATE"),
  LessonController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("LESSON_DELETE"),
  LessonController.delete
);

module.exports = router;
