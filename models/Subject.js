const mongoose = require('mongoose');
const SubjectSchema = new mongoose.Schema({
  title: { en: { type: String, required: true }, ar: { type: String, required: true } },
  description: { en: String, ar: String },
  grade_level: Number,
  start_date: Date,
  end_date: Date,
  price_mode: Number,
  is_free: { type: Boolean, default: false },
  cover_image_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Subject', SubjectSchema);