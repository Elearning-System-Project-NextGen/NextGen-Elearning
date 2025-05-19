const Lesson = require("../models/Lesson");
const Joi = require("joi");
const { t } = require("i18next");

const lessonSchema = Joi.object({
  course_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("course_id_required"),
    }),
  title: Joi.object({
    en: Joi.string()
      .required()
      .messages({ "string.empty": t("title_en_required") }),
    ar: Joi.string()
      .required()
      .messages({ "string.empty": t("title_ar_required") }),
  }).required(),
  order: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": t("order_required"),
    }),
  content_type: Joi.string().allow("").optional(),
  media_id: Joi.string().hex().length(24).optional(),
  duration: Joi.string().allow("").optional(),
});

class LessonController {
  static async index(req, res) {
    try {
      const lessonModel = new Lesson();
      const lessons = await lessonModel.getAll();
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const lessonModel = new Lesson();
      const lesson = await lessonModel.findOne(req.params.id);
      if (!lesson) {
        return res.status(404).json({ error: t("lesson_not_found") });
      }
      res.status(200).json(lesson);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = lessonSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const lessonModel = new Lesson();
      const cleanedBody = { ...value };

      const lesson = await lessonModel.create(cleanedBody);
      res.status(201).json({ message: t("lesson_created"), lesson });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = lessonSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const lessonModel = new Lesson();
      const cleanedBody = { ...value };

      const lesson = await lessonModel.update(req.params.id, cleanedBody);
      if (!lesson) {
        return res.status(404).json({ error: t("lesson_not_found") });
      }
      res.status(200).json({ message: t("lesson_updated"), lesson });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const lessonModel = new Lesson();
      const deletedLesson = await lessonModel.delete(req.params.id);
      if (!deletedLesson) {
        return res.status(404).json({ error: t("lesson_not_found") });
      }
      res.status(200).json({ message: t("lesson_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = LessonController;
