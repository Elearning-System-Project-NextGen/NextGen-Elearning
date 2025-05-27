const SessionSchema = require("../schemas/sessionSchema");
const BaseModel = require("./BaseModel");

class Session extends BaseModel {
  constructor() {
    super(SessionSchema);
  }
  // ✅ Create new session
  async createSession(data) {
    return await this.modelSchema.create(data);
  }

  // ✅ Get current session by token
  async getCurrentSession(token) {
    return await this.modelSchema
      .findOne({ token })
      .populate("user_id")
      .populate("device_id");
  }

  // ✅ Update session by ID
  async updateSession(id, data) {
    return await this.modelSchema.findByIdAndUpdate(id, data, { new: true });
  }

  // ✅ Delete current session by token
  async deleteCurrentSession(token) {
    return await this.modelSchema.findOneAndDelete({ token });
  }

  // ✅ Delete all sessions for a user
  async deleteAllSessions(user_id) {
    return await this.modelSchema.deleteMany({ user_id });
  }
}

module.exports = Session;
