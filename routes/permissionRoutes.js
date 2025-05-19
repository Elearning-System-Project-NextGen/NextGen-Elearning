const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/PermissionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, PermissionController.index);
router.get("/:id", authMiddleware, PermissionController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  PermissionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  PermissionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  PermissionController.delete
);

module.exports = router;
