const express = require("express");
const router = express.Router();
const RolePermissionController = require("../controllers/RolePermissionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, RolePermissionController.index);
router.get("/:id", authMiddleware, RolePermissionController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  RolePermissionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  RolePermissionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  RolePermissionController.delete
);

module.exports = router;
