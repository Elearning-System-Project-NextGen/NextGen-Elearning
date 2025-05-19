const express = require("express");
const router = express.Router();
const AssignmentController = require("../controllers/AssignmentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, AssignmentController.index);
router.get("/:id", authMiddleware, AssignmentController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  AssignmentController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  AssignmentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  AssignmentController.delete
);

module.exports = router;
