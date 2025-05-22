const Enrollment = require("../models/Enrollment");
const Joi = require("joi");
const { t } = require("i18next");

const enrollmentSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("student_id_required"),
      "string.length": t("invalid_student_id_format"),
    }),
  course_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("course_id_required"),
      "string.length": t("invalid_course_id_format"),
    }),
  enrollment_date: Joi.date().optional(),
  status: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": t("status_must_be_number"),
      "number.integer": t("status_must_be_integer"),
      "number.min": t("status_minimum_0"),
    }),
  overall_progress: Joi.number()
    .min(0)
    .max(100)
    .optional()
    .messages({
      "number.base": t("overall_progress_must_be_number"),
      "number.min": t("overall_progress_min_0"),
      "number.max": t("overall_progress_max_100"),
    }),
  last_access: Joi.date().optional(),
});

const enrollmentUpdateSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .messages({
      "string.length": t("invalid_student_id_format"),
    }),
  course_id: Joi.string()
    .hex()
    .length(24)
    .messages({
      "string.length": t("invalid_course_id_format"),
    }),
  enrollment_date: Joi.date(),
  status: Joi.number()
    .integer()
    .min(0)
    .messages({
      "number.base": t("status_must_be_number"),
      "number.integer": t("status_must_be_integer"),
      "number.min": t("status_minimum_0"),
    }),
  overall_progress: Joi.number()
    .min(0)
    .max(100)
    .messages({
      "number.base": t("overall_progress_must_be_number"),
      "number.min": t("overall_progress_min_0"),
      "number.max": t("overall_progress_max_100"),
    }),
  last_access: Joi.date(),
});

class EnrollmentController {
  static async index(req, res) {
    try {
      const enrollmentModel = new Enrollment();
      const enrollments = await enrollmentModel.getAll();
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const enrollmentModel = new Enrollment();
      const enrollment = await enrollmentModel.findOne(req.params.id);
      if (!enrollment) {
        return res.status(404).json({ error: t("enrollment_not_found") });
      }
      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = enrollmentSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const enrollmentModel = new Enrollment();
      const cleanedBody = {
        ...value,
        enrollment_date: value.enrollment_date || new Date(),
      };

      const enrollment = await enrollmentModel.create(cleanedBody);
      res.status(201).json({ message: t("enrollment_created"), enrollment });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = enrollmentUpdateSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const enrollmentModel = new Enrollment();
      const cleanedBody = { ...value };

      const enrollment = await enrollmentModel.update(
        req.params.id,
        cleanedBody
      );
      if (!enrollment) {
        return res.status(404).json({ error: t("enrollment_not_found") });
      }
      res.status(200).json({ message: t("enrollment_updated"), enrollment });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const enrollmentModel = new Enrollment();
      const deletedEnrollment = await enrollmentModel.delete(req.params.id);
      if (!deletedEnrollment) {
        return res.status(404).json({ error: t("enrollment_not_found") });
      }
      res.status(200).json({ message: t("enrollment_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async findByStudent(req, res) {
    try {
      const enrollmentModel = new Enrollment();
      const enrollments = await enrollmentModel.findByStudent(
        req.params.studentId
      );
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = EnrollmentController;
