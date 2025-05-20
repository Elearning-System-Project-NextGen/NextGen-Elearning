const Role = require("../models/Role");

async function seedRoles() {
  const roleModel = new Role();
  await roleModel.deleteMany({});
  await roleModel.create({ name: "admin" });
  await roleModel.create({ name: "teacher" });
  await roleModel.create({ name: "student" });
  console.log("Roles seeded");
}

module.exports = seedRoles;
