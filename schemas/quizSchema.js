const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizQuestion",
      },
    ],
    total_score: {
      type: Number,
      required: true,
      min: 1,
    },
    duration: {
      type: Number,
      min: 1,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { new: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
