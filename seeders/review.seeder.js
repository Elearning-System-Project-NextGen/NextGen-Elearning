const mongoose = require("mongoose");
const Review = require("../models/Review");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedReviews = async (students, courses) => {
  try {
    console.log("Seeding reviews...");
    const reviewsModel = new Review();
    await reviewsModel.deleteMany({});

    const reviews = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.helpers.arrayElement(courses)._id,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      created_at: faker.date.recent(),
    }));

    const insertedReviews = await reviewsModel.insertMany(reviews);
    console.log(`Inserted ${insertedReviews.length} reviews`);
    return insertedReviews;
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
};

module.exports = seedReviews;