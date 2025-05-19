const AddressSchema = require("../schemas/addressSchema");
const BaseModel = require("./BaseModel");

class Address extends BaseModel {
  constructor() {
    super(AddressSchema);
  }
}

module.exports = Address;
