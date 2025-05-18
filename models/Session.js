const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Session', SessionSchema);