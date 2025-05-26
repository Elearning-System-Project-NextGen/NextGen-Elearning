const mongoose = require("mongoose");

const blockedTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, index: true }, // Added index for faster lookups
    created_at: { type: Date, default: Date.now, expires: 3600 }, // Auto-expire after 1 hour
  },
  { timestamps: false }
);

module.exports = mongoose.model("BlockedToken", blockedTokenSchema);
