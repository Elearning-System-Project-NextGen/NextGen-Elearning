const Media = require("../models/Media");
const Joi = require("joi");
const { t } = require("i18next");
const path = require("path");
const fs = require("fs");

const mediaSchema = Joi.object({
  url: Joi.string()
    .required()
    .messages({
      "string.empty": t("url_required"),
    }),
  size: Joi.number().integer().min(0).optional(),
  type: Joi.string().allow("").optional(),
  duration: Joi.string().allow("").optional(),
  model_id: Joi.string().hex().length(24).optional(),
  model_type: Joi.string().allow("").optional(),
});

const mediaUpdateSchema = Joi.object({
  url: Joi.string()
    .uri()
    .messages({
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
      const media = await mediaModel.create(value);

      res.status(201).json({ message: t("media_created"), media });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
<<<<<<< Updated upstream
      const mediaModel = new Media();

      const oldMedia = await mediaModel.findOne(req.params.id);
      if (!oldMedia) {
        return res.status(404).json({ error: t("media_not_found") });
      }

=======
>>>>>>> Stashed changes
      if (!req.file) {
        return res.status(400).json({ error: t("file_required") });
      }

      const dirPath = "uploads/";
      const fileUrl = req.file.filename;

      const bodyData = {
        size: Number(req.body.size) || req.file.size,
        type: req.file.mimetype,
        duration: req.body.duration || "",
        model_id: req.body.model_id,
        model_type: req.body.model_type,
        url: `${dirPath}${fileUrl}`,
      };

<<<<<<< Updated upstream
      const { error, value } = mediaSchema.validate(bodyData, {
=======
      const { error, value } = mediaUpdateSchema.validate(bodyData, {
>>>>>>> Stashed changes
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

<<<<<<< Updated upstream
      if (oldMedia.url) {
        const oldFilePath = path.join(__dirname, "..", oldMedia.url);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.warn("⚠️ لم يتم حذف الملف القديم:", err.message);
        });
      }

      const updatedMedia = await mediaModel.update(req.params.id, value);

      res
        .status(200)
        .json({ message: t("media_updated"), media: updatedMedia });
=======
      const mediaModel = new Media();

      // احصل على السجل القديم عشان تحذف ملفه بعد التحديث
      const oldMedia = await mediaModel.findOne(req.params.id);
      if (!oldMedia) {
        return res.status(404).json({ error: t("media_not_found") });
      }

      const updatedMedia = await mediaModel.update(req.params.id, value);

      // حذف الملف القديم
      const fs = require("fs");
      fs.unlink(oldMedia.url, (err) => {
        if (err) {
          console.warn("⚠️ Failed to delete file from server:", err.message);
        } else {
          console.log("🗑️ File deleted:", oldMedia.url);
        }
      });

      res
        .status(200)
        .json({ message: t("media_updated"), media: updatedMedia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const mediaModel = new Media();
      const media = await mediaModel.findOne(req.params.id);
      if (!media) {
        return res.status(404).json({ error: t("media_not_found") });
      }


      const fs = require("fs");
      fs.unlink(media.url, (err) => {
        if (err) {
          console.warn("⚠️ Failed to delete file from server:", err.message);
        } else {
          console.log("🗑️ File deleted:", media.url);
        }
      });

      const deletedMedia = await mediaModel.delete(req.params.id);
      res.status(200).json({ message: t("media_deleted") });
>>>>>>> Stashed changes
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const mediaModel = new Media();
      const media = await mediaModel.findOne(req.params.id);

      if (!media) {
        return res.status(404).json({ error: t("media_not_found") });
      }

      const filePath = path.resolve("uploads", path.basename(media.url));

      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn("Failed to delete file from server:", err.message);
        } else {
          console.log("File deleted:", media.url);
        }
      });

      await mediaModel.delete(req.params.id);

      res.status(200).json({ message: t("media_deleted") });
    } catch (error) {
      console.error("🔥 خطأ في حذف media:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = MediaController;
