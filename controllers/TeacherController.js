const Teacher = require("../models/Teacher");
const Joi = require("joi");
const { t } = require("i18next");

const teacherSchema = Joi.object({
  user_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("user_id_required"),
    }),
  subject_id: Joi.string().hex().length(24).optional(),
  bio: Joi.object({
    en: Joi.string().allow(""),
    ar: Joi.string().allow(""),
  }).optional(),
});

class TeacherController {
  static async index(req, res) {
    try {
      const teacherModel = new Teacher();
      const teachers = await teacherModel.getAll();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const teacherModel = new Teacher();
      const teacher = await teacherModel.findOne(req.params.id);
      if (!teacher) {
        return res.status(404).json({ error: t("teacher_not_found") });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = teacherSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const teacherModel = new Teacher();
      const cleanedBody = { ...value };

      const teacher = await teacherModel.create(cleanedBody);
      res.status(201).json({ message: t("teacher_created"), teacher });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = teacherSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const teacherModel = new Teacher();
      const cleanedBody = { ...value };

      const teacher = await teacherModel.update(req.params.id, cleanedBody);
      if (!teacher) {
        return res.status(404).json({ error: t("teacher_not_found") });
      }
      res.status(200).json({ message: t("teacher_updated"), teacher });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const teacherModel = new Teacher();
      const deletedTeacher = await teacherModel.delete(req.params.id);
      if (!deletedTeacher) {
        return res.status(404).json({ error: t("teacher_not_found") });
      }
      res.status(200).json({ message: t("teacher_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = TeacherController;
