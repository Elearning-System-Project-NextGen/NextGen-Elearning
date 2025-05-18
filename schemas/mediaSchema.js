const mongoose = require('mongoose');
const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  size: Number,
  type: String,
  duration: String,
  model_id: mongoose.Schema.Types.ObjectId,
  model_type: String,
});
module.exports = mongoose.model('Media', mediaSchema);