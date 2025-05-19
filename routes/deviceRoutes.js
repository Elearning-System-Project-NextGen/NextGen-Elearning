const express = require("express");
const router = express.Router();
const DeviceController = require("../controllers/DeviceController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, DeviceController.index);
router.get("/:id", authMiddleware, DeviceController.view);
router.get("/:id/name", authMiddleware, DeviceController.name);
router.post("/", authMiddleware, restrictTo("admin"), DeviceController.create);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  DeviceController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  DeviceController.delete
);

module.exports = router;
