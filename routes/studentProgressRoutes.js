const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const StudentProgressController = require("../controllers/StudentProgressController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("STUDENTPROGRESS_VIEW"),
  StudentProgressController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("STUDENTPROGRESS_VIEW_DETAIL"),
  StudentProgressController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("STUDENTPROGRESS_CREATE"),
  StudentProgressController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("STUDENTPROGRESS_UPDATE"),
  StudentProgressController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("STUDENTPROGRESS_DELETE"),
  StudentProgressController.delete
);

module.exports = router;
