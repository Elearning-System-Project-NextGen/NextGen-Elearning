const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const DeviceController = require("../controllers/DeviceController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("DEVICE_VIEW"),
  DeviceController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("DEVICE_VIEW_DETAIL"),
  DeviceController.view
);
router.get(
  "/:id/name",
  authMiddleware,
  hasPermission("DEVICE_VIEW_DETAIL"),
  DeviceController.name
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("DEVICE_CREATE"),
  DeviceController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("DEVICE_UPDATE"),
  DeviceController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("DEVICE_DELETE"),
  DeviceController.delete
);

module.exports = router;
