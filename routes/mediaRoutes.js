const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const MediaController = require("../controllers/MediaController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploads");

router.get(
  "/",
  authMiddleware,
  hasPermission("MEDIA_VIEW"),
  MediaController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("MEDIA_VIEW_DETAIL"),
  MediaController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("MEDIA_CREATE"),
  upload.single("image"),
  MediaController.create
);

router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("MEDIA_UPDATE"),
  upload.single("image"),
  MediaController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("MEDIA_DELETE"),
  MediaController.delete
);

module.exports = router;
