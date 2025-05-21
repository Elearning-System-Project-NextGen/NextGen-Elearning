const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  issue_date: { type: Date, default: Date.now },
  certificate_url: { type: String, required: true },
});
module.exports = mongoose.model("Certificate", certificateSchema);
