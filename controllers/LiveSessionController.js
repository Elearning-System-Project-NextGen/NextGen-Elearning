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
      "string.length": t("invalid_course_id_format"),
    }),

  schedule: Joi.date()
    .required()
    .messages({
      "date.base": t("schedule_required"),
    }),

  streaming_url: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": t("invalid_streaming_url"),
    }),

  recording_url: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": t("invalid_recording_url"),
    }),

  attendance_required: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": t("attendance_required_must_be_boolean"),
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
    console.log("0");

    try {
      const { error, value } = liveSessionSchema.validate(req.body, {
        abortEarly: false,
      });
      console.log("1");

      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }
      console.log("2");

      const liveSessionModel = new LiveSession();
      const cleanedBody = { ...value };
      console.log("3");

      const liveSession = await liveSessionModel.create(cleanedBody);
      console.log("4");

      res.status(201).json({ message: t("live_session_created"), liveSession });
      console.log("5");
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
