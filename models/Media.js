const MediaSchema = require("../schemas/mediaSchema");
const BaseModel = require("./BaseModel");

class Media extends BaseModel {
  constructor() {
    super(MediaSchema);
  }
}

module.exports = Media;
