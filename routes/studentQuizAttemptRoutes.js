const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const StudentQuizAttemptController = require("../controllers/StudentQuizAttemptController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("STUDENTQUIZATTEMPT_VIEW"),
  StudentQuizAttemptController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("STUDENTQUIZATTEMPT_VIEW_DETAIL"),
  StudentQuizAttemptController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("student"),
  hasPermission("STUDENTQUIZATTEMPT_CREATE"),
  StudentQuizAttemptController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("STUDENTQUIZATTEMPT_UPDATE"),
  StudentQuizAttemptController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("STUDENTQUIZATTEMPT_DELETE"),
  StudentQuizAttemptController.delete
);

module.exports = router;
