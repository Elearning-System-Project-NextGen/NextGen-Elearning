const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollment_date: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  overall_progress: { type: Number, default: 0 },
  last_access: { type: Date }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);