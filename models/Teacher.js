const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
  bio: String,
  education_level: String,
  years_of_experience: Number,
  rating_count: Number,
  video_intro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  social_links: Object,
});
module.exports = mongoose.model('Teacher', TeacherSchema);