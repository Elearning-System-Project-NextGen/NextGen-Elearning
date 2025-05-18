const mongoose = require('mongoose');
const assignmentSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { en: { type: String, required: true }, ar: { type: String, required: true } },
  description: { en: String, ar: String },
  due_date: Date,
});
module.exports = mongoose.model('Assignment', assignmentSchema);