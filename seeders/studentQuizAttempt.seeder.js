const mongoose = require("mongoose");
const StudentQuizAttempt = require("../models/StudentQuizAttempt");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedStudentQuizAttempts = async (students, quizzes) => {
  try {
    console.log("Seeding student quiz attempts...");
    const studentQuizAttemptModel = new StudentQuizAttempt();
    await studentQuizAttemptModel.deleteMany({});

    const attempts = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      quiz_id: faker.helpers.arrayElement(quizzes)._id,
      score: faker.number.int({ min: 0, max: 100 }),
      attempt_date: faker.date.recent(),
      answers: [
        {
          question_id: new mongoose.Types.ObjectId(),
          selected_option: faker.helpers.arrayElement(["0", "1", "2", "3"]),
        },
        {
          question_id: new mongoose.Types.ObjectId(),
          selected_option: faker.helpers.arrayElement(["0", "1", "2", "3"]),
        },
      ],
    }));

    const insertedAttempts = await studentQuizAttemptModel.insertMany(attempts);
    console.log(`Inserted ${insertedAttempts.length} student quiz attempts`);
    return insertedAttempts;
  } catch (error) {
    console.error("Error seeding student quiz attempts:", error);
    throw error;
  }
};

module.exports = seedStudentQuizAttempts;