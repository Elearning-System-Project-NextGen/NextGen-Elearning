const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedEnrollments = async (students, courses) => {
  try {
    console.log("Seeding enrollments...");
    await Enrollment.deleteMany({});

    const enrollments = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.random.arrayElement(courses)._id,
      enrollment_date: new Date(),
      status: 1,
      overall_progress: faker.random.number({ min: 0, max: 50 }),
      last_access: new Date(),
    }));

    const insertedEnrollments = await Enrollment.insertMany(enrollments);
    console.log(`Inserted ${insertedEnrollments.length} enrollments`);
    return insertedEnrollments;
  } catch (error) {
    console.error("Error seeding enrollments:", error);
    throw error;
  }
};

module.exports = seedEnrollments;
