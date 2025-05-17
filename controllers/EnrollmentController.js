const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const i18next = require('../config/i18n');

class EnrollmentController {
  static async enroll(req, res) {
    const { course_id } = req.body;
    if (!course_id) {
      return res.status(400).json({ error: i18next.t('courseIdRequired') });
    }
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ error: i18next.t('courseNotFound') });
    }
    if (!course.is_published) {
      return res.status(400).json({ error: i18next.t('courseNotAvailable') });
    }
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: i18next.t('onlyStudents') });
    }
    const existingEnrollment = await Enrollment.findOne({ student_id: req.user.id, course_id });
    if (existingEnrollment) {
      return res.status(400).json({ error: i18next.t('alreadyEnrolled') });
    }
    const enrollment = new Enrollment({
      student_id: req.user.id,
      course_id,
      enrollment_date: new Date()
    });
    await enrollment.save();
    res.status(201).json({ message: 'Enrolled successfully' });
  }
}

module.exports = EnrollmentController;