const mongoose = require("mongoose");
const rolePermissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
});
module.exports = mongoose.model("RolePermission", rolePermissionSchema);
