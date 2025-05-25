const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const TeacherController = require("../controllers/TeacherController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("TEACHER_VIEW"),
  TeacherController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("TEACHER_VIEW_DETAIL"),
  TeacherController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("TEACHER_CREATE"),
  TeacherController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("TEACHER_UPDATE"),
  TeacherController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("TEACHER_DELETE"),
  TeacherController.delete
);

module.exports = router;
