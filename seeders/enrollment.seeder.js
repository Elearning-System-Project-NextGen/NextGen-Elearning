const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedEnrollments = async (students, courses) => {
  try {
    console.log("Seeding enrollments...");
    const enrollmentModel = new Enrollment();
    await enrollmentModel.deleteMany({});

    const enrollments = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.helpers.arrayElement(courses)._id,
      enrollment_date: faker.date.recent(),
      status: 1,
      overall_progress: faker.number.int({ min: 0, max: 50 }),
      last_access: faker.date.recent(),
    }));

    const insertedEnrollments = await enrollmentModel.insertMany(enrollments);
    console.log(`Inserted ${insertedEnrollments.length} enrollments`);
    return insertedEnrollments;
  } catch (error) {
    console.error("Error seeding enrollments:", error);
    throw error;
  }
};

module.exports = seedEnrollments;
