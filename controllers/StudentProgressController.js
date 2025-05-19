const StudentProgress = require("../models/StudentProgress");
const Joi = require("joi");
const { t } = require("i18next");

const studentProgressSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("student_id_required"),
    }),
  course_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("course_id_required"),
    }),
  lesson_id: Joi.string().hex().length(24).optional(),
  progress_percentage: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": t("progress_percentage_required"),
      "number.min": t("progress_percentage_min"),
      "number.max": t("progress_percentage_max"),
    }),
  last_updated: Joi.date().optional(),
});

class StudentProgressController {
  static async index(req, res) {
    try {
      const studentProgressModel = new StudentProgress();
      const studentProgresses = await studentProgressModel.getAll();
      res.status(200).json(studentProgresses);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const studentProgressModel = new StudentProgress();
      const studentProgress = await studentProgressModel.findOne(req.params.id);
      if (!studentProgress) {
        return res.status(404).json({ error: t("student_progress_not_found") });
      }
      res.status(200).json(studentProgress);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = studentProgressSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const studentProgressModel = new StudentProgress();
      const cleanedBody = {
        ...value,
        last_updated: value.last_updated || new Date(),
      };

      const studentProgress = await studentProgressModel.create(cleanedBody);
      res
        .status(201)
        .json({ message: t("student_progress_created"), studentProgress });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = studentProgressSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const studentProgressModel = new StudentProgress();
      const cleanedBody = { ...value, last_updated: new Date() };

      const studentProgress = await studentProgressModel.update(
        req.params.id,
        cleanedBody
      );
      if (!studentProgress) {
        return res.status(404).json({ error: t("student_progress_not_found") });
      }
      res
        .status(200)
        .json({ message: t("student_progress_updated"), studentProgress });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const studentProgressModel = new StudentProgress();
      const deletedStudentProgress = await studentProgressModel.delete(
        req.params.id
      );
      if (!deletedStudentProgress) {
        return res.status(404).json({ error: t("student_progress_not_found") });
      }
      res.status(200).json({ message: t("student_progress_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = StudentProgressController;
