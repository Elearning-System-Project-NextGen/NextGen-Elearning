const SessionSchema = require("../schemas/sessionSchema");
const BaseModel = require("./BaseModel");

class Session extends BaseModel {
  constructor() {
    super(SessionSchema);
  }
}

module.exports = Session;
