const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const EnrollmentController = require("../controllers/EnrollmentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("ENROLLMENT_VIEW"),
  EnrollmentController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("ENROLLMENT_VIEW_DETAIL"),
  EnrollmentController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "student"),
  hasPermission("ENROLLMENT_CREATE"),
  EnrollmentController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ENROLLMENT_UPDATE"),
  EnrollmentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ENROLLMENT_DELETE"),
  EnrollmentController.delete
);

module.exports = router;
