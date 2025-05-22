const mongoose = require('mongoose');
const deviceSchema = new mongoose.Schema({
  name: String,
  bigid: Number,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Device', deviceSchema);