const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploads");

router.get(
  "/",
  authMiddleware,
  hasPermission("STUDENT_VIEW"),
  StudentController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("STUDENT_VIEW_DETAIL"),
  StudentController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("STUDENT_CREATE"),
  StudentController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "student"),
  hasPermission("STUDENT_UPDATE"),
  upload.single("photo"), 
  StudentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  hasPermission("STUDENT_DELETE"),
  StudentController.delete
);

module.exports = router;
