const QuizQuestionSchema = require("../schemas/quizQuestionSchema");
const BaseModel = require("./BaseModel");

class QuizQuestion extends BaseModel {
  constructor() {
    super(QuizQuestionSchema);
  }
}

module.exports = QuizQuestion;
