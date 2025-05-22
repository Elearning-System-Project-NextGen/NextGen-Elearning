const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedTeachers = async (users, subjects) => {
  try {
    console.log("Seeding teachers...");
    const teacherModel = new Teacher();
    await teacherModel.deleteMany({});

    const teacherUsers = users.filter(
      (user) => user.role_id?.name?.toLowerCase() === "teacher"
    );

    console.log(`Found ${teacherUsers.length} teacher users`);

    const teachers = teacherUsers.map((user) => ({
      user_id: user._id,
      subject_id: faker.helpers.arrayElement(subjects)._id,
      bio: faker.lorem.paragraph(),
      education_level: faker.helpers.arrayElement([
        "Bachelor's",
        "Master's",
        "PhD",
      ]),
      years_of_experience: faker.number.int({ min: 1, max: 20 }),
      rating_count: faker.number.int({ min: 0, max: 100 }),
      social_links: {
        linkedin: faker.internet.url(),
        twitter: faker.internet.url(),
      },
    }));

    const insertedTeachers = await teacherModel.insertMany(teachers);
    console.log(`Inserted ${insertedTeachers.length} teachers`);
    return insertedTeachers;
  } catch (error) {
    console.error("Error seeding teachers:", error);
    throw error;
  }
};

module.exports = seedTeachers;
