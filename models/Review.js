const ReviewSchema = require("../schemas/reviewSchema");
const BaseModel = require("./BaseModel");

class Review extends BaseModel {
  constructor() {
    super(ReviewSchema);
  }
}

module.exports = Review;
