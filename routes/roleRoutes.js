const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLE_VIEW"),
  RoleController.index
);
router.get(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLE_VIEW_DETAIL"),
  RoleController.view
);
router.get(
  "/:id/name",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLE_VIEW_DETAIL"),
  RoleController.name
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLE_CREATE"),
  RoleController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLE_UPDATE"),
  RoleController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("ROLE_DELETE"),
  RoleController.delete
);

module.exports = router;
