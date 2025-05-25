const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("ATTENDANCE_VIEW"),
  AttendanceController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("ATTENDANCE_VIEW_DETAIL"),
  AttendanceController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("ATTENDANCE_CREATE"),
  AttendanceController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("ATTENDANCE_UPDATE"),
  AttendanceController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("ATTENDANCE_DELETE"),
  AttendanceController.delete
);

module.exports = router;
