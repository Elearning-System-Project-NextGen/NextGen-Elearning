const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, QuizController.index);
router.get("/:id", authMiddleware, QuizController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  QuizController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  QuizController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  QuizController.delete
);

module.exports = router;
