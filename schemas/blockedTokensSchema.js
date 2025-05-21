const mongoose = require("mongoose");

const blockedTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("BlockedToken", blockedTokenSchema);
