const mongoose = require('mongoose');
const enrollmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollment_date: Date,
  status: Number,
  overall_progress: Number,
  last_access: Date,
});
module.exports = mongoose.model('Enrollment', enrollmentSchema);