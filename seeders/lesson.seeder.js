const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedLessons = async (courses) => {
  try {
    console.log("Seeding lessons...");
    await Lesson.deleteMany({});

    const lessons = courses.flatMap((course, index) =>
      Array.from({ length: 3 }, (_, i) => ({
        course_id: course._id,
        title: {
          en: `Lesson ${i + 1} for ${course.title.en}`,
          ar: `الدرس ${i + 1} لـ ${course.title.ar}`,
        },
        order: i + 1,
        content_type: faker.random.arrayElement(["video", "text", "quiz"]),
        duration: `${faker.random.number({ min: 10, max: 60 })} minutes`,
      }))
    );

    const insertedLessons = await Lesson.insertMany(lessons);
    console.log(`Inserted ${insertedLessons.length} lessons`);
    return insertedLessons;
  } catch (error) {
    console.error("Error seeding lessons:", error);
    throw error;
  }
};

module.exports = seedLessons;
