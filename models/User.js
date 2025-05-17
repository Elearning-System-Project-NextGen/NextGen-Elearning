const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  language: { type: String, default: 'en', enum: ['en', 'ar'] },
  registration_date: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  last_login: { type: Date },
  grade_level: { type: String }, // Student-specific
  bio: { type: String }, // Teacher-specific
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postal_code: String
  },
  profile_picture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);