const express = require("express");
const router = express.Router();
const BlockedTokensController = require("../controllers/BlockedTokensController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  restrictTo("admin"),
  BlockedTokensController.index
);
router.get(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  BlockedTokensController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  BlockedTokensController.create
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  BlockedTokensController.delete
);

module.exports = router;
