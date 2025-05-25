const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const QuizQuestionController = require("../controllers/QuizQuestionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("QUIZQUESTION_VIEW"),
  QuizQuestionController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("QUIZQUESTION_VIEW_DETAIL"),
  QuizQuestionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("QUIZQUESTION_CREATE"),
  QuizQuestionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("QUIZQUESTION_UPDATE"),
  QuizQuestionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("QUIZQUESTION_DELETE"),
  QuizQuestionController.delete
);

module.exports = router;
