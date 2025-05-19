const CourseSchema = require("../schemas/courseSchema");
const BaseModel = require("./BaseModel");

class Course extends BaseModel {
  constructor() {
    super(CourseSchema);
  }
}

module.exports = Course;
