const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const AssignmentController = require("../controllers/AssignmentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("ASSIGNMENT_VIEW"),
  AssignmentController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("ASSIGNMENT_VIEW_DETAIL"),
  AssignmentController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("ASSIGNMENT_CREATE"),
  AssignmentController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("ASSIGNMENT_UPDATE"),
  AssignmentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("ASSIGNMENT_DELETE"),
  AssignmentController.delete
);

module.exports = router;
