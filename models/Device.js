const mongoose = require('mongoose');
const DeviceSchema = new mongoose.Schema({
  name: String,
  bigid: Number,
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Device', DeviceSchema);