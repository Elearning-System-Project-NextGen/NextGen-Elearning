const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, ReviewController.index);
router.get("/:id", authMiddleware, ReviewController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("student"),
  ReviewController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("student"),
  ReviewController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("student", "admin"),
  ReviewController.delete
);

module.exports = router;
