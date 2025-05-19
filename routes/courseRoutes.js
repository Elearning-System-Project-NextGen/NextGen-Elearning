const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, CourseController.index);
router.get("/:id", authMiddleware, CourseController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  CourseController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  CourseController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  CourseController.delete
);

module.exports = router;
