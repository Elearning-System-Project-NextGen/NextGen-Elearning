const LessonSchema = require("../schemas/lessonSchema");
const BaseModel = require("./BaseModel");

class Lesson extends BaseModel {
  constructor() {
    super(LessonSchema);
  }
}

module.exports = Lesson;
