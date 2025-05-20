const RoleSchema = require("../schemas/roleSchema");
const BaseModel = require("./BaseModel");

class Role extends BaseModel {
  constructor() {
    super(RoleSchema);
  }

  async findByName(name) {
    return this.modelSchema.findOne({ name }).exec();
  }
  
}

module.exports = Role;
