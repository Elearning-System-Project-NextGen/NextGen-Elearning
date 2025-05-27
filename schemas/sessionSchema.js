const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role_id: { type: String },
    permissions: { type: String },
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      //required: true,
    },
    login_time: { type: Date, default: Date.now },
    logout_time: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema); 
