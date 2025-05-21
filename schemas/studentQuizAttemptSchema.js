const mongoose = require("mongoose");
const studentQuizAttemptSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    score: Number,
    attempt_date: { type: Date, default: Date.now },
    answers: [
      {
        question_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuizQuestion",
          required: true,
        },
        selected_option: { type: String, required: true },
      },
    ],
  },
  { new: true }
);
module.exports = mongoose.model("StudentQuizAttempt", studentQuizAttemptSchema);
