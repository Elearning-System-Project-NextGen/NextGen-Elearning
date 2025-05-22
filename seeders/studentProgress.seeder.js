const mongoose = require("mongoose");
const StudentProgress = require("../models/StudentProgress");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedStudentProgress = async (students, courses, lessons) => {
  try {
    console.log("Seeding student progress...");
    const StudentProgressModel = new StudentProgress();
    await StudentProgressModel.deleteMany({});

    const progress = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.helpers.arrayElement(courses)._id,
      lesson_id: faker.helpers.arrayElement(lessons)._id,
      progress_percentage: faker.number.int({ min: 0, max: 100 }),
      last_updated: faker.date.recent(),
    }));

    const insertedProgress = await StudentProgressModel.insertMany(progress);
    console.log(`Inserted ${insertedProgress.length} student progress records`);
    return insertedProgress;
  } catch (error) {
    console.error("Error seeding student progress:", error);
    throw error;
  }
};

module.exports = seedStudentProgress;