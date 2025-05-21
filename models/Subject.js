const BaseModel = require("./BaseModel");
const SubjectSchema = require("../schemas/subjectSchema");

class Subject extends BaseModel {
  constructor() {
    super(SubjectSchema);
  }

}

module.exports = Subject;
