const Permission = require("../models/Permission");

async function seedPermissions() {
  const permissionModel = new Permission();
  await permissionModel.deleteMany({});
  await permissionModel.create({ permission_key: "create_course" });
  await permissionModel.create({ permission_key: "view_quiz" });
  await permissionModel.create({ permission_key: "edit_course" });
  console.log("Permissions seeded");
}

module.exports = seedPermissions;
