const DeviceSchema = require("../schemas/deviceSchema");
const BaseModel = require("./BaseModel");

class Device extends BaseModel {
  constructor() {
    super(DeviceSchema);
  }
}

module.exports = Device;
