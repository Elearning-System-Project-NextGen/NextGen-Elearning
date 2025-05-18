const mongoose = require('mongoose');
const CertificateSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  issue_date: { type: Date, default: Date.now },
  certificate_url: String,
});
module.exports = mongoose.model('Certificate', CertificateSchema);