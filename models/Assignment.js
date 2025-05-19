const AssignmentSchema = require("../schemas/assignmentSchema");
const BaseModel = require("./BaseModel");

class Assignment extends BaseModel {
  constructor() {
    super(AssignmentSchema);
  }
}

module.exports = Assignment;
