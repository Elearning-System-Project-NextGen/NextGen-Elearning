const QuizSchema = require("../schemas/quizSchema");
const BaseModel = require("./BaseModel");

class Quiz extends BaseModel {
  constructor() {
    super(QuizSchema);
  }
}

module.exports = Quiz;
