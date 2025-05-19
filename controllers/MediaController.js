const Media = require("../models/Media");
const Joi = require("joi");
const { t } = require("i18next");

const mediaSchema = Joi.object({
  url: Joi.string()
    .uri()
    .required()
    .messages({
      "string.empty": t("url_required"),
      "string.uri": t("invalid_url"),
    }),
  size: Joi.number().integer().min(0).optional(),
  type: Joi.string().allow("").optional(),
  duration: Joi.string().allow("").optional(),
  model_id: Joi.string().hex().length(24).optional(),
  model_type: Joi.string().allow("").optional(),
});

class MediaController {
  static async index(req, res) {
    try {
      const mediaModel = new Media();
      const media = await mediaModel.getAll();
      res.status(200).json(media);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const mediaModel = new Media();
      const media = await mediaModel.findOne(req.params.id);
      if (!media) {
        return res.status(404).json({ error: t("media_not_found") });
      }
      res.status(200).json(media);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = mediaSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const mediaModel = new Media();
      const cleanedBody = { ...value };

      const media = await mediaModel.create(cleanedBody);
      res.status(201).json({ message: t("media_created"), media });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = mediaSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const mediaModel = new Media();
      const cleanedBody = { ...value };

      const media = await mediaModel.update(req.params.id, cleanedBody);
      if (!media) {
        return res.status(404).json({ error: t("media_not_found") });
      }
      res.status(200).json({ message: t("media_updated"), media });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const mediaModel = new Media();
      const deletedMedia = await mediaModel.delete(req.params.id);
      if (!deletedMedia) {
        return res.status(404).json({ error: t("media_not_found") });
      }
      res.status(200).json({ message: t("media_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = MediaController;
