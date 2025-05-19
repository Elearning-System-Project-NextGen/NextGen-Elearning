const Certificate = require("../models/Certificate");
const Joi = require("joi");
const { t } = require("i18next");

const certificateSchema = Joi.object({
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
  issue_date: Joi.date().optional(),
  certificate_url: Joi.string()
    .uri()
    .required()
    .messages({
      "string.empty": t("certificate_url_required"),
      "string.uri": t("invalid_url"),
    }),
});

class CertificateController {
  static async index(req, res) {
    try {
      const certificateModel = new Certificate();
      const certificates = await certificateModel.getAll();
      res.status(200).json(certificates);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const certificateModel = new Certificate();
      const certificate = await certificateModel.findOne(req.params.id);
      if (!certificate) {
        return res.status(404).json({ error: t("certificate_not_found") });
      }
      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = certificateSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const certificateModel = new Certificate();
      const cleanedBody = {
        ...value,
        issue_date: value.issue_date || new Date(),
      };

      const certificate = await certificateModel.create(cleanedBody);
      res.status(201).json({ message: t("certificate_created"), certificate });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = certificateSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const certificateModel = new Certificate();
      const cleanedBody = { ...value };

      const certificate = await certificateModel.update(
        req.params.id,
        cleanedBody
      );
      if (!certificate) {
        return res.status(404).json({ error: t("certificate_not_found") });
      }
      res.status(200).json({ message: t("certificate_updated"), certificate });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const certificateModel = new Certificate();
      const deletedCertificate = await certificateModel.delete(req.params.id);
      if (!deletedCertificate) {
        return res.status(404).json({ error: t("certificate_not_found") });
      }
      res.status(200).json({ message: t("certificate_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = CertificateController;
