const Student = require("../models/Student");
const Joi = require("joi");
const { t } = require("i18next");

const studentSchema = Joi.object({
  grade_level: Joi.number().integer().min(1).max(12).optional(),
  section: Joi.string().max(10).optional(),
  birth_date: Joi.date().iso().optional(),
  gender: Joi.number().valid(0, 1).optional(), // 0 = female, 1 = male
  stream: Joi.string()
    .valid("Science", "Literature", "Commercial", "Industrial")
    .optional(),
  guardian_name: Joi.string().max(100).optional(),
  guardian_phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
  enrollment_status: Joi.number().valid(0, 1).optional(), // 0 = inactive, 1 = active
  enrollment_year: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear() + 1)
    .optional(),
  address_id: Joi.string().hex().length(24).optional(),
  profile_picture_id: Joi.string().hex().length(24).optional(),
  is_verified: Joi.boolean().optional(),
  referral_code: Joi.string().alphanum().max(20).optional(),

  // embedded user info
  full_name: Joi.string().max(100),
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(100).optional(),
  phone_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
  role_id: Joi.string().hex().length(24).optional(),
  status: Joi.number().valid(0, 1).optional(),
  language: Joi.string().valid("en", "ar").optional(),
  last_login: Joi.date().iso().optional(),
});

class StudentController {
  static async index(req, res) {
    try {
      const studentModel = new Student();
      const students = await studentModel.getAll();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const studentModel = new Student();
      const student = await studentModel.findOne(req.params.id);
      if (!student) {
        return res.status(404).json({ error: t("student_not_found") });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = studentSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const studentModel = new Student();
      const cleanedBody = { ...value };

      const student = await studentModel.create(cleanedBody);
      res.status(201).json({ message: t("student_created"), student });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = studentSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const studentModel = new Student();
      const cleanedBody = { ...value };

      const student = await studentModel.update(req.params.id, cleanedBody);
      if (!student) {
        return res.status(404).json({ error: t("student_not_found") });
      }
      res.status(200).json({ message: t("student_updated"), student });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const studentModel = new Student();
      const deletedStudent = await studentModel.delete(req.params.id);
      if (!deletedStudent) {
        return res.status(404).json({ error: t("student_not_found") });
      }
      res.status(200).json({ message: t("student_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = StudentController;
