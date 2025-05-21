const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedAssignments = async (courses) => {
  try {
    console.log("Seeding assignments...");
    await Assignment.deleteMany({});

    const assignments = courses.map((course, index) => ({
      course_id: course._id,
      title: {
        en: `Assignment ${index + 1} for ${course.title.en}`,
        ar: `واجب ${index + 1} لـ ${course.title.ar}`,
      },
      description: {
        en: faker.lorem.paragraph(),
        ar: faker.lorem.paragraph(),
      },
      due_date: faker.date.soon(15),
    }));

    const insertedAssignments = await Assignment.insertMany(assignments);
    console.log(`Inserted ${insertedAssignments.length} assignments`);
    return insertedAssignments;
  } catch (error) {
    console.error("Error seeding assignments:", error);
    throw error;
  }
};

module.exports = seedAssignments;