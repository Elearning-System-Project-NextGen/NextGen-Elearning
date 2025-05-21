const mongoose = require("mongoose");
const StudentProgress = require("../models/StudentProgress");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedStudentProgress = async (students, courses, lessons) => {
  try {
    console.log("Seeding student progress...");
    await StudentProgress.deleteMany({});

    const progress = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.random.arrayElement(courses)._id,
      lesson_id: faker.random.arrayElement(lessons)._id,
      progress_percentage: faker.random.number({ min: 0, max: 100 }),
      last_updated: new Date(),
    }));

    const insertedProgress = await StudentProgress.insertMany(progress);
    console.log(`Inserted ${insertedProgress.length} student progress records`);
    return insertedProgress;
  } catch (error) {
    console.error("Error seeding student progress:", error);
    throw error;
  }
};

module.exports = seedStudentProgress;