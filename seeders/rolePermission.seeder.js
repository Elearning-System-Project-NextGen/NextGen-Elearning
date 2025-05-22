const mongoose = require("mongoose");
const RolePermission = require("../models/RolePermission");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedRolePermissions = async (roles, permissions) => {
  try {
    console.log("Seeding role permissions...");
    const rolePermissionModel = new RolePermission();
    await rolePermissionModel.deleteMany({});

    console.log(
      "Roles:",
      roles.map((r) => r.name)
    );
    console.log(
      "Permissions:",
      permissions.map((p) => p.permission_key)
    );

    const rolePermissions = [
      {
        role_id: roles.find((r) => r.name === "admin")._id,
        permission_id: permissions.find(
          (p) => p.permission_key === "CREATE_USER"
        )._id,
      },
      {
        role_id: roles.find((r) => r.name === "admin")._id,
        permission_id: permissions.find(
          (p) => p.permission_key === "UPDATE_COURSE"
        )._id,
      },
      {
        role_id: roles.find((r) => r.name === "teacher")._id,
        permission_id: permissions.find(
          (p) => p.permission_key === "UPDATE_COURSE"
        )._id,
      },
      {
        role_id: roles.find((r) => r.name === "student")._id,
        permission_id: permissions.find(
          (p) => p.permission_key === "VIEW_REPORTS"
        )._id,
      },
    ];

    const insertedRolePermissions = await rolePermissionModel.insertMany(
      rolePermissions
    );
    console.log(`Inserted ${insertedRolePermissions.length} role permissions`);
    return insertedRolePermissions;
  } catch (error) {
    console.error("Error seeding role permissions:", error);
    throw error;
  }
};

module.exports = seedRolePermissions;
