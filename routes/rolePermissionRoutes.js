const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const RolePermissionController = require("../controllers/RolePermissionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLEPERMISSION_VIEW"),
  RolePermissionController.index
);
router.get(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLEPERMISSION_VIEW_DETAIL"),
  RolePermissionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLEPERMISSION_CREATE"),
  RolePermissionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLEPERMISSION_UPDATE"),
  RolePermissionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLEPERMISSION_DELETE"),
  RolePermissionController.delete
);

module.exports = router;
