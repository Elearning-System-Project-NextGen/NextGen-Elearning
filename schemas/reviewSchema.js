const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // بدل reviewer_id
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
    created_at: { type: Date, default: Date.now }, // بدل date
  },
  { new: true }
);
module.exports = mongoose.model("Review", reviewSchema);
