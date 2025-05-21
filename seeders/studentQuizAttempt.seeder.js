const mongoose = require("mongoose");
const StudentQuizAttempt = require("../models/StudentQuizAttempt");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedStudentQuizAttempts = async (students, quizzes) => {
  try {
    console.log("Seeding student quiz attempts...");
    await StudentQuizAttempt.deleteMany({});

    const attempts = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      quiz_id: faker.random.arrayElement(quizzes)._id,
      score: faker.random.number({ min: 0, max: 100 }),
      attempt_date: new Date(),
      answers: [
        { question_id: faker.random.alphaNumeric(24), answer: "0" },
        { question_id: faker.random.alphaNumeric(24), answer: "1" },
      ],
    }));

    const insertedAttempts = await StudentQuizAttempt.insertMany(attempts);
    console.log(`Inserted ${insertedAttempts.length} student quiz attempts`);
    return insertedAttempts;
  } catch (error) {
    console.error("Error seeding student quiz attempts:", error);
    throw error;
  }
};

module.exports = seedStudentQuizAttempts;