const LiveSession = require("../models/LiveSession");
const Joi = require("joi");
const { t } = require("i18next");

const liveSessionSchema = Joi.object({
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
  start_time: Joi.date()
    .required()
    .messages({
      "date.base": t("start_time_required"),
    }),
  end_time: Joi.date()
    .greater(Joi.ref("start_time"))
    .required()
    .messages({
      "date.base": t("end_time_required"),
      "date.greater": t("end_time_after_start"),
    }),
  meeting_url: Joi.string()
    .uri()
    .required()
    .messages({
      "string.empty": t("meeting_url_required"),
      "string.uri": t("invalid_url"),
    }),
});

class LiveSessionController {
  static async index(req, res) {
    try {
      const liveSessionModel = new LiveSession();
      const liveSessions = await liveSessionModel.getAll();
      res.status(200).json(liveSessions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const liveSessionModel = new LiveSession();
      const liveSession = await liveSessionModel.findOne(req.params.id);
      if (!liveSession) {
        return res.status(404).json({ error: t("live_session_not_found") });
      }
      res.status(200).json(liveSession);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = liveSessionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const liveSessionModel = new LiveSession();
      const cleanedBody = { ...value };

      const liveSession = await liveSessionModel.create(cleanedBody);
      res.status(201).json({ message: t("live_session_created"), liveSession });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = liveSessionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const liveSessionModel = new LiveSession();
      const cleanedBody = { ...value };

      const liveSession = await liveSessionModel.update(
        req.params.id,
        cleanedBody
      );
      if (!liveSession) {
        return res.status(404).json({ error: t("live_session_not_found") });
      }
      res.status(200).json({ message: t("live_session_updated"), liveSession });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const liveSessionModel = new LiveSession();
      const deletedLiveSession = await liveSessionModel.delete(req.params.id);
      if (!deletedLiveSession) {
        return res.status(404).json({ error: t("live_session_not_found") });
      }
      res.status(200).json({ message: t("live_session_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = LiveSessionController;
