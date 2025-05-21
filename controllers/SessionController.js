const Session = require("../models/Session");
const Joi = require("joi");
const { t } = require("i18next");

const sessionSchema = Joi.object({
  user_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("user_id_required"),
    }),
  device_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("device_id_required"),
    }),
  token: Joi.string()
    .required()
    .messages({
      "string.empty": t("token_required"),
    }),
  login_time: Joi.date().optional(),
  logout_time: Joi.date().optional(),
});

class SessionController {
  static async index(req, res) {
    try {
      const sessionModel = new Session();
      const sessions = await sessionModel.getAll();
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const sessionModel = new Session();
      const session = await sessionModel.findOne(req.params.id);
      if (!session) {
        return res.status(404).json({ error: t("session_not_found") });
      }
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = sessionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const sessionModel = new Session();
      const cleanedBody = {
        ...value,
        login_time: value.login_time || new Date(),
      };

      const session = await sessionModel.create(cleanedBody);
      res.status(201).json({ message: t("session_created"), session });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = sessionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const sessionModel = new Session();
      const cleanedBody = { ...value };

      const session = await sessionModel.update(req.params.id, cleanedBody);
      if (!session) {
        return res.status(404).json({ error: t("session_not_found") });
      }
      res.status(200).json({ message: t("session_updated"), session });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const sessionModel = new Session();
      const deletedSession = await sessionModel.delete(req.params.id);
      if (!deletedSession) {
        return res.status(404).json({ error: t("session_not_found") });
      }
      res.status(200).json({ message: t("session_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = SessionController;
