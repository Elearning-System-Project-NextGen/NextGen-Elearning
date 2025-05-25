const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("REVIEW_VIEW"),
  ReviewController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("REVIEW_VIEW_DETAIL"),
  ReviewController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("student"),
  hasPermission("REVIEW_CREATE"),
  ReviewController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("student"),
  hasPermission("REVIEW_UPDATE"),
  ReviewController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("student", "admin"),
  hasPermission("REVIEW_DELETE"),
  ReviewController.delete
);

module.exports = router;
