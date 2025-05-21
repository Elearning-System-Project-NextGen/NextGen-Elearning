const mongoose = require("mongoose");
const Permission = require("../models/Permission");
const { t } = require("i18next");

const seedPermissions = async () => {
  try {
    console.log("Seeding permissions...");

    const permissionModel = new Permission();

    await permissionModel.deleteMany();
    await permissionModel.insertMany([
      { permission_key: "CREATE_USER" },
      { permission_key: "DELETE_USER" },
      { permission_key: "UPDATE_COURSE" },
      { permission_key: "VIEW_REPORTS" },
    ]);

    console.log("Permissions seeded");

    return await permissionModel.getAll();
  } catch (error) {
    console.error("Error seeding permissions:", error);
    throw error;
  }
};

module.exports = seedPermissions;
