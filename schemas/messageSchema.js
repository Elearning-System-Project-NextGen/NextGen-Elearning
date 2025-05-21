const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true }, // بدل "message"
  sent_at: { type: Date, default: Date.now }, // بدل "timestamp"
  is_read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Message", messageSchema);
