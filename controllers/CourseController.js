const Course = require("../models/Course");
const i18next = require("../config/i18n");
const courseSchema = require("../schemas/courseSchema");

class CourseController {
  static async getCourse(req, res) {
    const course = await Course.findById(req.params.id).populate(
      "subject_id teacher_id"
    );
    if (!course) {
      return res.status(404).json({ error: i18next.t("courseNotFound") });
    }
    const lang = req.user.language || "en";
    res.json({
      title: course.title[lang] || course.title.en,
      description: course.description[lang] || course.description.en,
      grade_level: course.grade_level,
      is_published: course.is_published,
    });
  }

  static async createCourse(req, res) {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ error: i18next.t("onlyTeachers") });
    }
    const { error } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { subject_id, title_en, title_ar, description_en, description_ar } =
      req.body;
    const course = new Course({
      subject_id,
      teacher_id: req.user.id,
      title: { en: title_en, ar: title_ar },
      description: { en: description_en, ar: description_ar },
    });
    await course.save();
    res.status(201).json({ message: "Course created" });
  }
}

module.exports = CourseController;
