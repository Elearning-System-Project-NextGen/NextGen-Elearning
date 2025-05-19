const AttendanceSchema = require("../schemas/attendanceSchema");
const BaseModel = require("./BaseModel");

class Attendance extends BaseModel {
  constructor() {
    super(AttendanceSchema);
  }
}

module.exports = Attendance;
