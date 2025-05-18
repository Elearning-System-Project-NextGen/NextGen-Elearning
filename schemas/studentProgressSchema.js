const mongoose = require('mongoose');
const studentProgressSchema = new mongoose.Schema({
  enrollment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' },
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  completed: { type: Boolean, default: false },
  completion_date: Date,
});
module.exports = mongoose.model('StudentProgress', studentProgressSchema);