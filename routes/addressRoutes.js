const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const AddressController = require("../controllers/AddressController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("ADDRESS_VIEW"),
  AddressController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("ADDRESS_VIEW_DETAIL"),
  AddressController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "student"),
  hasPermission("ADDRESS_CREATE"),
  AddressController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "student"),
  hasPermission("ADDRESS_UPDATE"),
  AddressController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "student"),
  hasPermission("ADDRESS_DELETE"),
  AddressController.delete
);

module.exports = router;
