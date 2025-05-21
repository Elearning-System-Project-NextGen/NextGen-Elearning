const mongoose = require("mongoose");
const Role = require("../models/Role");
const { t } = require("i18next");

const seedRoles = async () => {
  try {
    console.log("Seeding roles...");

    const roleModel = new Role(); 

    await roleModel.deleteMany(); 
    const roles = [{ name: "admin" }, { name: "teacher" }, { name: "student" }];

    const insertedRoles = await roleModel.insertMany(roles); 
    console.log(`Inserted ${insertedRoles.length} roles`);
    return insertedRoles;
  } catch (error) {
    console.error("Error seeding roles:", error);
    throw error;
  }
};

module.exports = seedRoles;
