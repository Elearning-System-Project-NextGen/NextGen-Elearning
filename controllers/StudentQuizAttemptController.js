const StudentQuizAttempt = require("../models/StudentQuizAttempt");
const Joi = require("joi");
const { t } = require("i18next");

const studentQuizAttemptSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("student_id_required"),
    }),
  quiz_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("quiz_id_required"),
    }),
  score: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": t("score_required"),
      "number.min": t("score_min"),
    }),
  attempt_date: Joi.date().optional(),
  answers: Joi.array().items(Joi.object()).optional(),
});

class StudentQuizAttemptController {
  static async index(req, res) {
    try {
      const studentQuizAttemptModel = new StudentQuizAttempt();
      const studentQuizAttempts = await studentQuizAttemptModel.getAll();
      res.status(200).json(studentQuizAttempts);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const studentQuizAttemptModel = new StudentQuizAttempt();
      const studentQuizAttempt = await studentQuizAttemptModel.findOne(
        req.params.id
      );
      if (!studentQuizAttempt) {
        return res
          .status(404)
          .json({ error: t("student_quiz_attempt_not_found") });
      }
      res.status(200).json(studentQuizAttempt);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = studentQuizAttemptSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const studentQuizAttemptModel = new StudentQuizAttempt();
      const cleanedBody = {
        ...value,
        attempt_date: value.attempt_date || new Date(),
      };

      const studentQuizAttempt = await studentQuizAttemptModel.create(
        cleanedBody
      );
      res
        .status(201)
        .json({
          message: t("student_quiz_attempt_created"),
          studentQuizAttempt,
        });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = studentQuizAttemptSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const studentQuizAttemptModel = new StudentQuizAttempt();
      const cleanedBody = { ...value };

      const studentQuizAttempt = await studentQuizAttemptModel.update(
        req.params.id,
        cleanedBody
      );
      if (!studentQuizAttempt) {
        return res
          .status(404)
          .json({ error: t("student_quiz_attempt_not_found") });
      }
      res
        .status(200)
        .json({
          message: t("student_quiz_attempt_updated"),
          studentQuizAttempt,
        });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const studentQuizAttemptModel = new StudentQuizAttempt();
      const deletedStudentQuizAttempt = await studentQuizAttemptModel.delete(
        req.params.id
      );
      if (!deletedStudentQuizAttempt) {
        return res
          .status(404)
          .json({ error: t("student_quiz_attempt_not_found") });
      }
      res.status(200).json({ message: t("student_quiz_attempt_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async findByStudent(req, res) {
    try {
      const studentQuizAttemptModel = new StudentQuizAttempt();
      const studentQuizAttempts = await studentQuizAttemptModel.findByStudent(
        req.params.studentId
      );
      res.status(200).json(studentQuizAttempts);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = StudentQuizAttemptController;
