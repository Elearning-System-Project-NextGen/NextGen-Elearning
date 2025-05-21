const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: String,
    education_level: String,
    years_of_experience: Number,
    rating_count: Number,
    video_intro_id: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    social_links: Object,
  },
  { new: true }
);
module.exports = mongoose.model("Teacher", teacherSchema);
