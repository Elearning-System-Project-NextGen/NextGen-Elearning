const TeacherSchema = require("../schemas/teacherSchema");
const BaseModel = require("./BaseModel");

class Teacher extends BaseModel {
    constructor() {
        super(TeacherSchema);
    }
}

module.exports = Teacher;