const mongoose = require('mongoose');
const StudentQuizAttemptSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  attempt_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('StudentQuizAttempt', StudentQuizAttemptSchema);