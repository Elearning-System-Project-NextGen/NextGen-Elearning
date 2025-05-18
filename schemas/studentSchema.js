const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  grade_level: Number,
  section: String,
  birth_date: Date,
  gender: Number,
  stream: String,
  guardian_name: String,
  guardian_phone: Number,
  enrollment_status: Number,
  enrollment_year: Number,
  address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  profile_picture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  is_verified: Boolean,
  referral_code: String,
});
module.exports = mongoose.model('Student', studentSchema);