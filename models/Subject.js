const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
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
  cover_image_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', subjectSchema);