const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { new: true }
);
module.exports = mongoose.model("Role", roleSchema);

// const mongoose = require("mongoose");

// const roleSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// roleSchema.virtual("users", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "role_id",
//   justOne: false,
// });

// module.exports = mongoose.model("Role", roleSchema);
