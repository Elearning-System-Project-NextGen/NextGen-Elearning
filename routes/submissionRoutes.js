const express = require("express");
const router = express.Router();
const SubmissionController = require("../controllers/SubmissionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, SubmissionController.index);
router.get("/:id", authMiddleware, SubmissionController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("student"),
  SubmissionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  SubmissionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  SubmissionController.delete
);

module.exports = router;
