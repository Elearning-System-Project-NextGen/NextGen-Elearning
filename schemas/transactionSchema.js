const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    amount: { type: Number, required: true, min: 0 },
    payment_method: { type: String, default: "" },
    transaction_date: { type: Date, default: Date.now },
    status: { type: Number, default: 0 },
  },
  { new: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
