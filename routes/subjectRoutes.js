const express = require("express");
const router = express.Router();
const SubjectController = require("../controllers/SubjectController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");
router.get("/", authMiddleware, SubjectController.index);

router.get("/:id", authMiddleware, SubjectController.view);

// smile
router.post("/",authMiddleware,restrictTo("admin", "teacher"),SubjectController.create);

router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  SubjectController.update
);

router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  SubjectController.delete
);

module.exports = router;
