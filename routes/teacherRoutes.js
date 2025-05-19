const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/TeacherController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, TeacherController.index);
router.get("/:id", authMiddleware, TeacherController.view);
router.post("/", authMiddleware, restrictTo("admin"), TeacherController.create);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  TeacherController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  TeacherController.delete
);

module.exports = router;
