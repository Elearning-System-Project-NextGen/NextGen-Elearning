const Assignment = require("../models/Assignment");
const Joi = require("joi");
const { t } = require("i18next");

const assignmentSchema = Joi.object({
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
  description: Joi.object({
    en: Joi.string().allow(""),
    ar: Joi.string().allow(""),
  }),
  due_date: Joi.date().optional(),
});

class AssignmentController {
  static async index(req, res) {
    try {
      const assignmentModel = new Assignment();
      const assignments = await assignmentModel.getAll();
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const assignmentModel = new Assignment();
      const assignment = await assignmentModel.findOne(req.params.id);
      if (!assignment) {
        return res.status(404).json({ error: t("assignment_not_found") });
      }
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = assignmentSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const assignmentModel = new Assignment();
      const cleanedBody = { ...value };

      const assignment = await assignmentModel.create(cleanedBody);
      res.status(201).json({ message: t("assignment_created"), assignment });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = assignmentSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const assignmentModel = new Assignment();
      const cleanedBody = { ...value };

      const assignment = await assignmentModel.update(
        req.params.id,
        cleanedBody
      );
      if (!assignment) {
        return res.status(404).json({ error: t("assignment_not_found") });
      }
      res.status(200).json({ message: t("assignment_updated"), assignment });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const assignmentModel = new Assignment();
      const deletedAssignment = await assignmentModel.delete(req.params.id);
      if (!deletedAssignment) {
        return res.status(404).json({ error: t("assignment_not_found") });
      }
      res.status(200).json({ message: t("assignment_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = AssignmentController;
