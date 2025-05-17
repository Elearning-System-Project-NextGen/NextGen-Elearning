const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    en: { type: String, required: true },
    ar: { type: String }
  },
  description: {
    en: { type: String },
    ar: { type: String }
  },
  grade_level: { type: Number },
  start_date: { type: Date },
  end_date: { type: Date },
  is_free: { type: Boolean, default: false },
  is_published: { type: Boolean, default: false },
  cover_image_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);