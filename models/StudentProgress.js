const StudentProgressSchema = require("../schemas/studentProgressSchema");
const BaseModel = require("./BaseModel");

class StudentProgress extends BaseModel {
  constructor() {
    super(StudentProgressSchema);
  }
}

module.exports = StudentProgress;
