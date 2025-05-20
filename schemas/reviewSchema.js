const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now },
  },
  { new: true }
);
module.exports = mongoose.model("Review", reviewSchema);
