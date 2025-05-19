const SubmissionSchema = require("../schemas/submissionSchema");
const BaseModel = require("./BaseModel");

class Submission extends BaseModel {
  constructor() {
    super(SubmissionSchema);
  }
}

module.exports = Submission;
