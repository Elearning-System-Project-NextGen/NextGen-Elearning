const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { new: true }
);
module.exports = mongoose.model("Role", roleSchema);

