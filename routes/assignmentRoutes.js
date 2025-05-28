const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const AssignmentController = require("../controllers/AssignmentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("SUBJECT_VIEW"), // ASSIGNMENT_VIEW
  AssignmentController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("SUBJECT_VIEW_DETAIL"), // ASSIGNMENT_VIEW_DETAIL
  AssignmentController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBJECT_CREATE"), //SUBJECT_CREATE ASSIGNMENT_CREATE
  AssignmentController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBJECT_UPDATE"), // ASSIGNMENT_UPDATE
  AssignmentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("SUBJECT_DELETE"), //ASSIGNMENT_DELETE
  AssignmentController.delete
);

module.exports = router;
