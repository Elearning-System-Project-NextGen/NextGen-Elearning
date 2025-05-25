const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const SubjectController = require("../controllers/SubjectController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("SUBJECT_VIEW"),
  SubjectController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("SUBJECT_VIEW_DETAIL"),
  SubjectController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBJECT_CREATE"),
  SubjectController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBJECT_UPDATE"),
  SubjectController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBJECT_DELETE"),
  SubjectController.delete
);

module.exports = router;
