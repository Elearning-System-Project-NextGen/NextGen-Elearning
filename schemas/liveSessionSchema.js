const mongoose = require('mongoose');
const liveSessionSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  schedule: { type: Date, required: true },
  streaming_url: String,
  recording_url: String,
  attendance_required: { type: Boolean, default: false },
});
module.exports = mongoose.model('LiveSession', liveSessionSchema);