const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { en: { type: String, required: true }, ar: { type: String, required: true } },
  description: { en: String, ar: String },
  time_limit: String,
  passing_score: Number,
});
module.exports = mongoose.model('Quiz', QuizSchema);