const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/LessonController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, LessonController.index);
router.get("/:id", authMiddleware, LessonController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  LessonController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  LessonController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  LessonController.delete
);

module.exports = router;
