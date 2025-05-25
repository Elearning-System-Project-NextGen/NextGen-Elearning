const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const PermissionController = require("../controllers/PermissionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("PERMISSION_VIEW"),
  PermissionController.index
);
router.get(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("PERMISSION_VIEW_DETAIL"),
  PermissionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("PERMISSION_CREATE"),
  PermissionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("PERMISSION_UPDATE"),
  PermissionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("PERMISSION_DELETE"),
  PermissionController.delete
);

module.exports = router;
