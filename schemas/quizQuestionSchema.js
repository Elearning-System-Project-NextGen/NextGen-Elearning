const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  question_text: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  options: [
    {
      text: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
      },
      is_correct: { type: Boolean, required: true },
    },
  ],
  score: {
    type: Number,
    required: true,
    min: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
