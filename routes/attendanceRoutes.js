const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, AttendanceController.index);
router.get("/:id", authMiddleware, AttendanceController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  AttendanceController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  AttendanceController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  AttendanceController.delete
);

module.exports = router;
