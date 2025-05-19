const CertificateSchema = require("../schemas/certificateSchema");
const BaseModel = require("./BaseModel");

class Certificate extends BaseModel {
  constructor() {
    super(CertificateSchema);
  }
}

module.exports = Certificate;
