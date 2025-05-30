const UserSchema = require("../schemas/userSchema");
const BaseModel = require("./BaseModel");

class User extends BaseModel {
  constructor() {
    super(UserSchema);
  }

  async findByEmail(email) {
    return this.modelSchema.findOne({ email }).exec();
  }

  async deleteMany(conditions = {}) {
    return this.modelSchema.deleteMany(conditions).exec();
  }

  async getAll() {
    return this.modelSchema.find().populate("user_id", "full_name");
  }
}

module.exports = User;
