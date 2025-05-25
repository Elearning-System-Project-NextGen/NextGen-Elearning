const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const CourseController = require("../controllers/CourseController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("COURSE_VIEW"),
  CourseController.index
);

router.get(
  "/:id",
  authMiddleware,
  hasPermission("COURSE_VIEW_DETAIL"),
  CourseController.view
);

router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("COURSE_CREATE"),
  CourseController.create
);

router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("COURSE_UPDATE"),
  CourseController.update
);

router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("COURSE_DELETE"),
  CourseController.delete
);

module.exports = router;
