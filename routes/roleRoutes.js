const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, RoleController.index);
router.get("/:id", authMiddleware, RoleController.view);
router.get("/:id/name", authMiddleware, RoleController.name);
router.post("/", authMiddleware, restrictTo("admin"), RoleController.create);
router.patch("/:id", authMiddleware, RoleController.update);
router.delete("/:id", authMiddleware, RoleController.delete);

module.exports = router;
