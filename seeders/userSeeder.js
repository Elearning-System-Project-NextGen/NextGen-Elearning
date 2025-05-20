// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");

// async function seedUsers() {
//   const user = new User();
//   await user.deleteMany({});
//   await user.create({
//     full_name: "Admin User",
//     username: "admin",
//     email: "admin@example.com",
//     password: await bcrypt.hash("admin123", 10),
//     role_id: "682c4aff1eada6804603361b",
//     language: "en",
//   });
//   console.log("Users seeded");
// }

// module.exports = seedUsers;

const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

async function seedUsers() {
  const userModel = new User();
  const roleModel = new Role();

  const adminRole = await roleModel.findOne({ name: "admin" });
  if (!adminRole) {
    throw new Error("Admin role not found. Please seed roles first.");
  }

  await userModel.deleteMany({});

  await userModel.create({
    full_name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    password: await bcrypt.hash("admin123", 10),
    phone_number: "+1234567890",
    role_id: adminRole._id,
    status: 1,
    language: "en",
  });

  console.log("Users seeded");
}

module.exports = seedUsers;
