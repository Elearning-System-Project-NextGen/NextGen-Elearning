const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const LiveSessionController = require("../controllers/LiveSessionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("LIVESESSION_VIEW"),
  LiveSessionController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("LIVESESSION_VIEW_DETAIL"),
  LiveSessionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("LIVESESSION_CREATE"),
  LiveSessionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("LIVESESSION_UPDATE"),
  LiveSessionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("LIVESESSION_DELETE"),
  LiveSessionController.delete
);

module.exports = router;
