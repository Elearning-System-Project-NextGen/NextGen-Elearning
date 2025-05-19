const express = require("express");
const router = express.Router();
const CertificateController = require("../controllers/CertificateController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, CertificateController.index);
router.get("/:id", authMiddleware, CertificateController.view);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  CertificateController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  CertificateController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  CertificateController.delete
);

module.exports = router;
