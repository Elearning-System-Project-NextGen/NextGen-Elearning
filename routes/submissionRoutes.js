const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const SubmissionController = require("../controllers/SubmissionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploads");

router.get(
  "/",
  authMiddleware,
  hasPermission("SUBMISSION_VIEW"),
  SubmissionController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("SUBMISSION_VIEW_DETAIL"),
  SubmissionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("student"),
  hasPermission("SUBMISSION_CREATE"),
  upload.single("file"), 
  SubmissionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBMISSION_UPDATE"),
  SubmissionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBMISSION_DELETE"),
  SubmissionController.delete
);

module.exports = router;
