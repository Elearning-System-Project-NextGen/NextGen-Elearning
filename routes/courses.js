const express = require('express');
const CourseController = require('../controllers/CourseController');
const AuthMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/:id', AuthMiddleware.authenticate, CourseController.getCourse);
router.post('/', AuthMiddleware.authenticate, CourseController.createCourse);

module.exports = router;