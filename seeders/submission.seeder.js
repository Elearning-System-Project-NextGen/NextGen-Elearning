const mongoose = require("mongoose");
const Submission = require("../models/Submission");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedSubmissions = async (students, assignments) => {
  try {
    console.log("Seeding submissions...");
    const submissionModel = new Submission();
    await submissionModel.deleteMany({});

    const submissions = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      assignment_id: faker.helpers.arrayElement(assignments)._id,
      submission_date: faker.date.recent(),
      content: faker.lorem.paragraph(),
      grade: faker.number.int({ min: 0, max: 100 }),
      feedback: faker.lorem.sentence(),
    }));

    const insertedSubmissions = await submissionModel.insertMany(submissions);
    console.log(`Inserted ${insertedSubmissions.length} submissions`);
    return insertedSubmissions;
  } catch (error) {
    console.error("Error seeding submissions:", error);
    throw error;
  }
};

module.exports = seedSubmissions;