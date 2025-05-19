const UserSchema = require("../schemas/userSchema");
const BaseModel = require("./BaseModel");

class User extends BaseModel {
  constructor() {
    super(UserSchema);
  }

  async findByEmail(email) {
    return this.modelSchema.findOne({ email }).exec();
  }
}

module.exports = User;
