const Course = require("../models/Course");
const Joi = require("joi");
const { t } = require("i18next");

const courseSchema = Joi.object({
  subject_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("subject_id_required"),
    }),
  teacher_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("teacher_id_required"),
    }),
  title: Joi.object({
    en: Joi.string()
      .required()
      .messages({ "string.empty": t("title_en_required") }),
    ar: Joi.string()
      .required()
      .messages({ "string.empty": t("title_ar_required") }),
  }).required(),
  description: Joi.object({
    en: Joi.string().allow(""),
    ar: Joi.string().allow(""),
  }),
  grade_level: Joi.number().integer().min(1).max(12),
  start_date: Joi.date(),
  end_date: Joi.date().greater(Joi.ref("start_date")),
  is_free: Joi.boolean().default(false),
  is_published: Joi.boolean().default(false),
  cover_image_id: Joi.string().hex().length(24),
});

class CourseController {
  static async index(req, res) {
    try {
      const courseModel = new Course();
      const courses = await courseModel.getAll();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const courseModel = new Course();
      const course = await courseModel.findOne(req.params.id);
      if (!course) {
        return res.status(404).json({ error: t("course_not_found") });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = courseSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const courseModel = new Course();
      const cleanedBody = { ...value, created_at: new Date() };

      const course = await courseModel.create(cleanedBody);
      res.status(201).json({ message: t("course_created"), course });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = courseSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const courseModel = new Course();
      const cleanedBody = { ...value };

      const course = await courseModel.update(req.params.id, cleanedBody);
      if (!course) {
        return res.status(404).json({ error: t("course_not_found") });
      }
      res.status(200).json({ message: t("course_updated"), course });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const courseModel = new Course();
      const deletedCourse = await courseModel.delete(req.params.id);
      if (!deletedCourse) {
        return res.status(404).json({ error: t("course_not_found") });
      }
      res.status(200).json({ message: t("course_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = CourseController;
