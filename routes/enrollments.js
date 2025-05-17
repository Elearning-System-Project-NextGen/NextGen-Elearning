const express = require('express');
const EnrollmentController = require('../controllers/EnrollmentController');
const AuthMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', AuthMiddleware.authenticate, EnrollmentController.enroll);

module.exports = router;