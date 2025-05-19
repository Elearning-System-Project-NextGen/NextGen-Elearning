const express = require("express");
const router = express.Router();
const LiveSessionController = require("../controllers/LiveSessionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, LiveSessionController.index);
router.get("/:id", authMiddleware, LiveSessionController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  LiveSessionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  LiveSessionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  LiveSessionController.delete
);

module.exports = router;
