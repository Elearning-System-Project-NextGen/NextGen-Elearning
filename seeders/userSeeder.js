const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function seedUsers() {
  const user = new User();
  await user.deleteMany({});
  await user.create({
    full_name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
    language: "en",
  });
  console.log("Users seeded");
}

module.exports = seedUsers;
