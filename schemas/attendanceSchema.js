const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  live_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LiveSession' },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attended: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Attendance', attendanceSchema);