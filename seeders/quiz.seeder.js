const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedQuizzes = async (courses) => {
  try {
    console.log("Seeding quizzes...");
    const quizzModel = new Quiz();
    await quizzModel.deleteMany({});

    const quizzes = courses.map((course, index) => ({
      course_id: course._id,
      title: {
        en: `Quiz ${index + 1} for ${course.title.en}`,
        ar: `اختبار ${index + 1} لـ ${course.title.ar}`,
      },
      description: {
        en: faker.lorem.paragraph(),
        ar: faker.lorem.paragraph(),
      },
      time_limit: `${faker.number.int({ min: 20, max: 60 })} minutes`,
      passing_score: faker.number.int({ min: 50, max: 80 }),
      total_score: faker.number.int({ min: 10, max: 100 }),
      duration: faker.number.int({ min: 10, max: 60 }), 
      is_published: faker.datatype.boolean()
    }));

    const insertedQuizzes = await quizzModel.insertMany(quizzes);
    console.
      log(`Inserted ${insertedQuizzes.length} quizzes`);
    return insertedQuizzes;
  } catch (error) {
    console.error("Error seeding quizzes:", error);
    throw error;
  }
};

module.exports = seedQuizzes;
