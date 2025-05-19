const SubjectSchema = require("../schemas/subjectSchema");
const BaseModel = require("./BaseModel");

class Subject extends BaseModel {
  constructor() {
    super(SubjectSchema);
  }

  async create(data) {
    return this.modelSchema.create(data);
  }

  async deleteMany(conditions = {}) {
    return this.modelSchema.deleteMany(conditions).exec();
  }

  async findById(id) {
    return this.modelSchema.findById(id).populate("cover_image_id").exec();
  }

  async findByGradeLevel(gradeLevel) {
    return this.modelSchema
      .find({ grade_level: gradeLevel })
      .populate("cover_image_id")
      .exec();
  }

  async update(id, data) {
    return this.modelSchema
      .findByIdAndUpdate(id, { ...data, updated_at: Date.now() }, { new: true })
      .exec();
  }
}

module.exports = Subject;
