const express = require("express");
const router = express.Router();
const StudentProgressController = require("../controllers/StudentProgressController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, StudentProgressController.index);
router.get("/:id", authMiddleware, StudentProgressController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  StudentProgressController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  StudentProgressController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  StudentProgressController.delete
);

module.exports = router;
