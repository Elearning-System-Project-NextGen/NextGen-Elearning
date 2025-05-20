const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: String,
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    registration_date: { type: Date, default: Date.now },
    status: Number,
    updated_date: { type: Date, default: Date.now },
    language: String,
    last_login: Date,
  },
  {
    new: true,
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// userSchema.virtual("role", {
//   ref: "Role",
//   localField: "role_id",
//   foreignField: "_id",
//   justOne: true,
// });

module.exports = mongoose.model("User", userSchema);
