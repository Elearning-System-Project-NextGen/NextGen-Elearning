const PermissionSchema = require("../schemas/permissionSchema");
const BaseModel = require("./BaseModel");

class Permission extends BaseModel {
  constructor() {
    super(PermissionSchema);
  }
  async getAllPermissions() {
    return this.modelSchema.getAll();
  }
}

module.exports = Permission;
