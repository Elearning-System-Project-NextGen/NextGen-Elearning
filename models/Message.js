const MessageSchema = require("../schemas/messageSchema");
const BaseModel = require("./BaseModel");

class Message extends BaseModel {
  constructor() {
    super(MessageSchema);
  }
}

module.exports = Message;
