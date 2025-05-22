const mongoose = require("mongoose");
const QuizQuestion = require("../models/QuizQuestion");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedQuizQuestions = async (quizzes) => {
  try {
    console.log("Seeding quiz questions...");
    const quizQuestionModel = new QuizQuestion();
    await quizQuestionModel.deleteMany({});

    const quizQuestions = quizzes.flatMap((quiz) =>
      Array.from({ length: 5 }, () => {
        const correctIndex = faker.number.int({ min: 0, max: 3 });

        const options = Array.from({ length: 4 }, (_, idx) => ({
          text: {
            en: faker.lorem.word(),
            ar: faker.lorem.word(),
          },
          is_correct: idx === correctIndex,
        }));

        return {
          quiz_id: quiz._id,
          question_text: {
            en: faker.lorem.sentence(),
            ar: faker.lorem.sentence(),
          },
          options,
          score: faker.number.int({ min: 1, max: 5 }),
        };
      })
    );

    const insertedQuizQuestions = await quizQuestionModel.insertMany(
      quizQuestions
    );
    console.log(`Inserted ${insertedQuizQuestions.length} quiz questions`);
    return insertedQuizQuestions;
  } catch (error) {
    console.error("Error seeding quiz questions:", error);
    throw error;
  }
};

module.exports = seedQuizQuestions;
