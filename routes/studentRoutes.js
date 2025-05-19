const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, StudentController.index);
router.get("/:id", authMiddleware, StudentController.view);
router.post("/", authMiddleware, restrictTo("admin"), StudentController.create);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "student"),
  StudentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  StudentController.delete
);

module.exports = router;
