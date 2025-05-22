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
<<<<<<< HEAD
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("MULTER ERROR:", err);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
=======
  upload.single("image"),
>>>>>>> branch1
  MediaController.create
);

router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("MULTER ERROR:", err);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  MediaController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  MediaController.delete
);

module.exports = router;
