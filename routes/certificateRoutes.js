const express = require("express");
const hasPermission = require("../middleware/permissionMiddleware");
const router = express.Router();
const CertificateController = require("../controllers/CertificateController");
const authMiddleware = require("../middleware/auth");
const restrictTo = require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  hasPermission("CERTIFICATE_VIEW"),
  CertificateController.index
);
router.get(
  "/:id",
  authMiddleware,
  hasPermission("CERTIFICATE_VIEW_DETAIL"),
  CertificateController.view
);
router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("CERTIFICATE_CREATE"),
  CertificateController.create
);
router.patch(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("CERTIFICATE_UPDATE"),
  CertificateController.update
);
router.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin", "teacher"),
  hasPermission("CERTIFICATE_DELETE"),
  CertificateController.delete
);

module.exports = router;
