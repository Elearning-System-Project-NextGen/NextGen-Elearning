const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const QuizController = require("../controllers/QuizController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("QUIZ_VIEW"),
  QuizController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("QUIZ_VIEW_DETAIL"),
  QuizController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("QUIZ_CREATE"),
  QuizController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("QUIZ_UPDATE"),
  QuizController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("QUIZ_DELETE"),
  QuizController.delete
);

module.exports = router;
