const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, SessionController.index);
router.get("/:id", authMiddleware, SessionController.view);
router.post("/", authMiddleware, restrictTo("admin"), SessionController.create);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  SessionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  SessionController.delete
);

module.exports = router;
