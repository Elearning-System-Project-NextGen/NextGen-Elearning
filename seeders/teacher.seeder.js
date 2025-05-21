const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedTeachers = async (users, subjects) => {
  try {
    console.log("Seeding teachers...");
    await Teacher.deleteMany({});

    const teacherUsers = users.filter((user) =>
      user.role_id.toString().includes("teacher")
    );
    const teachers = teacherUsers.map((user) => ({
      user_id: user._id,
      subject_id: faker.random.arrayElement(subjects)._id,
      bio: faker.lorem.paragraph(),
      education_level: faker.random.arrayElement([
        "Bachelor's",
        "Master's",
        "PhD",
      ]),
      years_of_experience: faker.random.number({ min: 1, max: 20 }),
      rating_count: faker.random.number({ min: 0, max: 100 }),
      social_links: {
        linkedin: faker.internet.url(),
        twitter: faker.internet.url(),
      },
    }));

    const insertedTeachers = await Teacher.insertMany(teachers);
    console.log(`Inserted ${insertedTeachers.length} teachers`);
    return insertedTeachers;
  } catch (error) {
    console.error("Error seeding teachers:", error);
    throw error;
  }
};

module.exports = seedTeachers;
