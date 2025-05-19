const LiveSessionSchema = require("../schemas/liveSessionSchema");
const BaseModel = require("./BaseModel");

class LiveSession extends BaseModel {
  constructor() {
    super(LiveSessionSchema);
  }
}

module.exports = LiveSession;
