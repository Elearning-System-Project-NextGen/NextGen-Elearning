const mongoose = require("mongoose");
const RolePermission = require("../models/RolePermission");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedRolePermissions = async (roles, permissions) => {
  try {
    console.log("Seeding role permissions...");
    await RolePermission.deleteMany({});

    const rolePermissions = [
      { role_id: roles.find((r) => r.name === "admin")._id, permission_id: permissions.find((p) => p.permission_key === "manage_users")._id },
      { role_id: roles.find((r) => r.name === "admin")._id, permission_id: permissions.find((p) => p.permission_key === "manage_courses")._id },
      { role_id: roles.find((r) => r.name === "teacher")._id, permission_id: permissions.find((p) => p.permission_key === "manage_courses")._id },
      { role_id: roles.find((r) => r.name === "student")._id, permission_id: permissions.find((p) => p.permission_key === "view_content")._id },
    ];

    const insertedRolePermissions = await RolePermission.insertMany(rolePermissions);
    console.log(`Inserted ${insertedRolePermissions.length} role permissions`);
    return insertedRolePermissions;
  } catch (error) {
    console.error("Error seeding role permissions:", error);
    throw error;
  }
};

module.exports = seedRolePermissions;