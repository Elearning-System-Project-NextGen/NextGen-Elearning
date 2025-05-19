const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/AddressController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, AddressController.index);
router.get("/:id", authMiddleware, AddressController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "student"),
  AddressController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "student"),
  AddressController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "student"),
  AddressController.delete
);

module.exports = router;
