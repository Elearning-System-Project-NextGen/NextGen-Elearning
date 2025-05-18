const mongoose = require('mongoose');
const SubmissionSchema = new mongoose.Schema({
  assignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submission_content: String,
  submission_date: { type: Date, default: Date.now },
  grade: Number,
});
module.exports = mongoose.model('Submission', SubmissionSchema);