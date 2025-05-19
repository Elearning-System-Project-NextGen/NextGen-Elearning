const EnrollmentSchema = require("../schemas/enrollmentSchema");
const BaseModel = require("./BaseModel");

class Enrollment extends BaseModel {
  constructor() {
    super(EnrollmentSchema);
  }

  async findByStudent(studentId) {
    return this.modelSchema.find({ student_id: studentId }).exec();
  }
}

module.exports = Enrollment;
