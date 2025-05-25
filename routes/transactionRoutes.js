const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("TRANSACTION_VIEW"),
  TransactionController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("TRANSACTION_VIEW_DETAIL"),
  TransactionController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "student"),
  hasPermission("TRANSACTION_CREATE"),
  TransactionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("TRANSACTION_UPDATE"),
  TransactionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("TRANSACTION_DELETE"),
  TransactionController.delete
);

module.exports = router;
