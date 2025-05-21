const mongoose = require("mongoose");
const Course = require("../models/Course");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedCourses = async (subjects, teachers) => {
  try {
    console.log("Seeding courses...");
    await Course.deleteMany({});

    const courses = subjects.map((subject, index) => ({
      subject_id: subject._id,
      teacher_id: teachers[0]._id, // Assuming first teacher
      title: {
        en: `${subject.title.en} Course ${index + 1}`,
        ar: `دورة ${subject.title.ar} ${index + 1}`,
      },
      description: {
        en: faker.lorem.paragraph(),
        ar: faker.lorem.paragraph(),
      },
      grade_level: subject.grade_level,
      start_date: subject.start_date,
      end_date: subject.end_date,
      is_free: subject.is_free,
      is_published: true,
    }));

    const insertedCourses = await Course.insertMany(courses);
    console.log(`Inserted ${insertedCourses.length} courses`);
    return insertedCourses;
  } catch (error) {
    console.error("Error seeding courses:", error);
    throw error;
  }
};

module.exports = seedCourses;
