const mongoose = require("mongoose");
const QuizQuestion = require("../models/QuizQuestion");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedQuizQuestions = async (quizzes) => {
  try {
    console.log("Seeding quiz questions...");
    await QuizQuestion.deleteMany({});

    const quizQuestions = quizzes.flatMap((quiz) =>
      Array.from({ length: 5 }, () => ({
        quiz_id: quiz._id,
        question_text: {
          en: faker.lorem.sentence(),
          ar: faker.lorem.sentence(),
        },
        options: {
          en: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ],
          ar: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ],
        },
        correct_answer: faker.random.arrayElement(["0", "1", "2", "3"]),
      }))
    );

    const insertedQuizQuestions = await QuizQuestion.insertMany(quizQuestions);
    console.log(`Inserted ${insertedQuizQuestions.length} quiz questions`);
    return insertedQuizQuestions;
  } catch (error) {
    console.error("Error seeding quiz questions:", error);
    throw error;
  }
};

module.exports = seedQuizQuestions;
