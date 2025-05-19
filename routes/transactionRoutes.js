const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, TransactionController.index);
router.get("/:id", authMiddleware, TransactionController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "student"),
  TransactionController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  TransactionController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  TransactionController.delete
);

module.exports = router;
