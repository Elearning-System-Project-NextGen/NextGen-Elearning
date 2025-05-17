const express = require('express');
const CourseController = require('../controllers/CourseController');
const AuthMiddleware = require('../middleware/auth');
const ValidateMiddleware = require('../middleware/validate');
const courseSchema = require('../schemas/courseSchema');
const router = express.Router();

router.get('/:id', AuthMiddleware.authenticate, CourseController.getCourse);
router.post('/', AuthMiddleware.authenticate, ValidateMiddleware.validate(courseSchema), CourseController.createCourse);

module.exports = router;