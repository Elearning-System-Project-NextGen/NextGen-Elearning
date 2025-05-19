const Subject = require("../models/Subject");
const Joi = require("joi");
const { t } = require("i18next");

const subjectSchema = Joi.object({
  title: Joi.object({
    en: Joi.string()
      .required()
      .messages({
        "string.empty": t("title_en_required"),
      }),
    ar: Joi.string()
      .required()
      .messages({
        "string.empty": t("title_ar_required"),
      }),
  }).required(),
  description: Joi.object({
    en: Joi.string().allow(""),
    ar: Joi.string().allow(""),
  }),
  grade_level: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": t("grade_level_required"),
      "number.min": t("grade_level_min"),
    }),
  start_date: Joi.date()
    .required()
    .messages({
      "date.base": t("start_date_required"),
    }),
  end_date: Joi.date()
    .required()
    .messages({
      "date.base": t("end_date_required"),
    }),
  price_mode: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": t("price_mode_required"),
    }),
  is_free: Joi.boolean().default(false),
  cover_image_id: Joi.string().allow(null),
});

class SubjectController {
  static async index(req, res) {
    try {
      const subjectModel = new Subject();
      const subjects = await subjectModel.getAll();
      res.status(200).json(subjects);
    } catch (error) {
      console.error("Index subjects error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const subjectModel = new Subject();
      const subject = await subjectModel.findById(req.params.id);
      if (!subject) {
        return res.status(404).json({ error: t("subject_not_found") });
      }
      res.status(200).json(subject);
    } catch (error) {
      console.error("View subject error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = subjectSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const subjectModel = new Subject();
      const cleanedBody = { ...value };

      const subject = await subjectModel.create(cleanedBody);
      res.status(201).json({ message: t("subject_created"), subject });
    } catch (error) {
      console.error("Create subject error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = subjectSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const subjectModel = new Subject();
      const cleanedBody = { ...value };

      const subject = await subjectModel.update(req.params.id, cleanedBody);
      if (!subject) {
        return res.status(404).json({ error: t("subject_not_found") });
      }
      res.status(200).json({ message: t("subject_updated"), subject });
    } catch (error) {
      console.error("Update subject error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const subjectModel = new Subject();
      const deletedSubject = await subjectModel.delete(req.params.id);
      if (!deletedSubject) {
        return res.status(404).json({ error: t("subject_not_found") });
      }
      res.status(200).json({ message: t("subject_deleted") });
    } catch (error) {
      console.error("Delete subject error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = SubjectController;
