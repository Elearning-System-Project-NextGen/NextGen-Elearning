const mongoose = require('mongoose');
const QuizQuestionSchema = new mongoose.Schema({
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  question_text: { en: String, ar: String },
  options: Object,
  correct_answer: { type: String, required: true },
});
module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);