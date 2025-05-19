const PermissionSchema = require("../schemas/permissionSchema");
const BaseModel = require("./BaseModel");

class Permission extends BaseModel {
  constructor() {
    super(PermissionSchema);
  }
}

module.exports = Permission;
