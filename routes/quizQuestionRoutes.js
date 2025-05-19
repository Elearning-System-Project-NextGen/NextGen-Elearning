const express = require("express");
const router = express.Router();
const QuizQuestionController = require("../controllers/QuizQuestionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, QuizQuestionController.index);
router.get("/:id", authMiddleware, QuizQuestionController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  QuizQuestionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  QuizQuestionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  QuizQuestionController.delete
);

module.exports = router;
