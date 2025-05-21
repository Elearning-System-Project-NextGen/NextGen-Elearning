const express = require("express");
const router = express.Router();
const EnrollmentController = require("../controllers/EnrollmentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, EnrollmentController.index);
router.get("/:id", authMiddleware, EnrollmentController.view);

router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "student"),
  EnrollmentController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  EnrollmentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  EnrollmentController.delete
);

module.exports = router;
