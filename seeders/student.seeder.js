const mongoose = require("mongoose");
const Student = require("../models/Student");
const { faker } = require("@faker-js/faker");

const seedStudents = async (users) => {
  try {
    console.log("Seeding students...");

    const studentModel = new Student();
    await studentModel.deleteMany();

    const studentUsers = users.filter(
      (user) => user.role_id?.name?.toLowerCase() === "student"
    );

    console.log(`Found ${studentUsers.length} student users`);

    const students = studentUsers.map((user) => ({
      user_id: user._id,
      grade_level: faker.number.int({ min: 1, max: 12 }),
      section: faker.string.alpha({ length: 1 }).toUpperCase(),
      birth_date: faker.date.past({ years: 20, refDate: new Date(2005, 0, 1) }),
      gender: faker.helpers.arrayElement([0, 1]),
      stream: faker.helpers.arrayElement([
        "Science",
        "Literature",
        "Commercial",
        "Industrial",
      ]),
      guardian_name: faker.person.fullName(),
      guardian_phone: parseInt(faker.string.numeric(10), 10),
      enrollment_status: 1,
      enrollment_year: faker.number.int({ min: 2020, max: 2025 }),
      is_verified: true,
      referral_code: faker.string.alphanumeric(10),
    }));

    const insertedStudents = await studentModel.insertMany(students);
    console.log(`Inserted ${insertedStudents.length} students`);
    return insertedStudents;
  } catch (error) {
    console.error("Error seeding students:", error);
    throw error;
  }
};

module.exports = seedStudents;
