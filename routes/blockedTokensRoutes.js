const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const BlockedTokensController = require("../controllers/BlockedTokensController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("BLOCKEDTOKENS_VIEW"),
  BlockedTokensController.index
);
router.get(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("BLOCKEDTOKENS_VIEW_DETAIL"),
  BlockedTokensController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("BLOCKEDTOKENS_CREATE"),
  BlockedTokensController.create
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("BLOCKEDTOKENS_DELETE"),
  BlockedTokensController.delete
);

module.exports = router;
