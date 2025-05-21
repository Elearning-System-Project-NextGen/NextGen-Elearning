const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { faker } = require("@faker-js/faker");

const seedUsers = async (roles) => {
  try {
    console.log("Seeding users...");

    const userModel = new User(); 

    await userModel.deleteMany(); 

    const users = [];
    const adminRole = roles.find((role) => role.name === "admin");
    const teacherRole = roles.find((role) => role.name === "teacher");
    const studentRole = roles.find((role) => role.name === "student");

    // Admin user
    users.push({
      full_name: "Admin User",
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("password123", 10),
      phone_number: faker.phone.number(),
      role_id: adminRole._id,
      status: 1,
      language: "en",
    });

    // Teacher user
    users.push({
      full_name: faker.name.fullName(),
      username: "teacher1",
      email: "teacher1@example.com",
      password: await bcrypt.hash("password123", 10),
      phone_number: faker.phone.number(),
      role_id: teacherRole._id,
      status: 1,
      language: "en",
    });

    // Student users
    for (let i = 0; i < 5; i++) {
      users.push({
        full_name: faker.name.fullName(),
        username: `student${i + 1}`,
        email: `student${i + 1}@example.com`,
        password: await bcrypt.hash("password123", 10),
        phone_number: faker.phone.number(),
        role_id: studentRole._id,
        status: 1,
        language: faker.helpers.arrayElement(["en", "ar"]),
      });
    }

    const insertedUsers = await userModel.insertMany(users); // ✅ instance method
    console.log(`Inserted ${insertedUsers.length} users`);
    return insertedUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

module.exports = seedUsers;
