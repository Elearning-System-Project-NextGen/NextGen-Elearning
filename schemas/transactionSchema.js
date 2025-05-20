const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    amount: Number,
    payment_method: String,
    transaction_date: { type: Date, default: Date.now },
    status: String,
  },
  { new: true }
);
module.exports = mongoose.model("Transaction", transactionSchema);
