const StudentSchema = require("../schemas/studentSchema");
const BaseModel = require("./BaseModel");

class Student extends BaseModel {
  constructor() {
    super(StudentSchema);
  }

  async getAll() {
    return this.modelSchema.find().populate("user_id", "full_name");
  }
}

module.exports = Student;
