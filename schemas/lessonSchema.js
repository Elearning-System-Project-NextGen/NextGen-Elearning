const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { en: { type: String, required: true }, ar: { type: String, required: true } },
  order: { type: Number, required: true },
  content_type: String,
  media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  duration: String,
});
module.exports = mongoose.model('Lesson', lessonSchema);