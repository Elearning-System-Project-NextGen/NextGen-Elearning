const express = require("express");
const router = express.Router();
const StudentQuizAttemptController = require("../controllers/StudentQuizAttemptController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, StudentQuizAttemptController.index);
router.get("/:id", authMiddleware, StudentQuizAttemptController.view);

router.post(
  "/",
  authMiddleware,
  restrictTo("student"),
  StudentQuizAttemptController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  StudentQuizAttemptController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  StudentQuizAttemptController.delete
);

module.exports = router;
