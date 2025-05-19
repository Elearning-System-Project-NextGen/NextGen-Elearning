const StudentSchema = require("../schemas/studentSchema");
const BaseModel = require("./BaseModel");

class Student extends BaseModel {
  constructor() {
    super(StudentSchema);
  }
}

module.exports = Student;
