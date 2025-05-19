const Student = require("../models/Student");
const Joi = require("joi");
const { t } = require("i18next");

const studentSchema = Joi.object({
  user_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("user_id_required"),
    }),
  grade_level: Joi.number().integer().min(1).max(12).optional(),
  parent_contact: Joi.string().allow("").optional(),
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
