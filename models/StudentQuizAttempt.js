const StudentQuizAttemptSchema = require("../schemas/studentQuizAttemptSchema");
const BaseModel = require("./BaseModel");

class StudentQuizAttempt extends BaseModel {
  constructor() {
    super(StudentQuizAttemptSchema);
  }
}

module.exports = StudentQuizAttempt;
