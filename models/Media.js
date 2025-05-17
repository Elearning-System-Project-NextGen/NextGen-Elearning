const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  size: { type: Number },
  type: { type: String }, // e.g., image, video
  referenced_id: { type: mongoose.Schema.Types.ObjectId },
  referenced_type: { type: String }, // e.g., Subject, Course, User
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);