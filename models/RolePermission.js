const RolePermissionSchema = require("../schemas/rolePermissionSchema");
const BaseModel = require("./BaseModel");

class RolePermission extends BaseModel {
  constructor() {
    super(RolePermissionSchema);
  }

  async create(data) {
    return this.modelSchema.create(data);
  }

  async deleteMany(conditions = {}) {
    return this.modelSchema.deleteMany(conditions).exec();
  }

  async findByRoleId(roleId) {
    return this.modelSchema
      .find({ role_id: roleId })
      .populate("permission_id")
      .exec();
  }

  async findByPermissionId(permissionId) {
    return this.modelSchema
      .find({ permission_id: permissionId })
      .populate("role_id")
      .exec();
  }
}

module.exports = RolePermission;
