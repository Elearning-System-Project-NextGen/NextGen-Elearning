const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  full_name: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: String,
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  registration_date: { type: Date, default: Date.now },
  status: Number,
  updated_date: { type: Date, default: Date.now },
  language: String,
  last_login: Date,
});
module.exports = mongoose.model('User', UserSchema);