const Submission = require("../models/Submission");
const Joi = require("joi");
const { t } = require("i18next");

const submissionSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("student_id_required"),
    }),
  assignment_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("assignment_id_required"),
    }),
  submission_date: Joi.date().optional(),
  content: Joi.string().allow("").optional(),
  grade: Joi.number().min(0).optional(),
  feedback: Joi.string().allow("").optional(),
});

class SubmissionController {
  static async index(req, res) {
    try {
      const submissionModel = new Submission();
      const submissions = await submissionModel.getAll();
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const submissionModel = new Submission();
      const submission = await submissionModel.findOne(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: t("submission_not_found") });
      }
      res.status(200).json(submission);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = submissionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const submissionModel = new Submission();
      const cleanedBody = {
        ...value,
        submission_date: value.submission_date || new Date(),
      };

      const submission = await submissionModel.create(cleanedBody);
      res.status(201).json({ message: t("submission_created"), submission });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = submissionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const submissionModel = new Submission();
      const cleanedBody = { ...value };

      const submission = await submissionModel.update(
        req.params.id,
        cleanedBody
      );
      if (!submission) {
        return res.status(404).json({ error: t("submission_not_found") });
      }
      res.status(200).json({ message: t("submission_updated"), submission });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const submissionModel = new Submission();
      const deletedSubmission = await submissionModel.delete(req.params.id);
      if (!deletedSubmission) {
        return res.status(404).json({ error: t("submission_not_found") });
      }
      res.status(200).json({ message: t("submission_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = SubmissionController;
