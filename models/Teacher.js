const TeacherSchema = require("../schemas/teacherSchema");
const BaseModel = require("./BaseModel");

class Teacher extends BaseModel {
  constructor() {
    super(TeacherSchema);
  }

  async getAll() {
    return this.modelSchema.find().populate("user_id", "full_name");
  }
}

module.exports = Teacher;
