const express = require("express");
const router = express.Router();
const MediaController = require("../controllers/MediaController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploads");

router.get("/", authMiddleware, MediaController.index);
router.get("/:id", authMiddleware, MediaController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  upload.single("image"),
  MediaController.create
);

router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  upload.single("image"),
  MediaController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  MediaController.delete
);

module.exports = router;
