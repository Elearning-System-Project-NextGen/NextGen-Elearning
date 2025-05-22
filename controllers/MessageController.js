const Message = require("../models/Message");
const Joi = require("joi");
const { t } = require("i18next");

const messageSchema = Joi.object({
  sender_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({ "string.empty": t("sender_id_required") }),

  receiver_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({ "string.empty": t("receiver_id_required") }),

  content: Joi.string()
    .required()
    .messages({ "string.empty": t("content_required") }),

  sent_at: Joi.date().optional(),
  is_read: Joi.boolean().optional(),
});

const messageUpdateSchema = Joi.object({
  sender_id: Joi.string()
    .hex()
    .length(24)
    .messages({ "string.length": t("invalid_sender_id_format") }),
  receiver_id: Joi.string()
    .hex()
    .length(24)
    .messages({ "string.length": t("invalid_receiver_id_format") }),
  content: Joi.string().messages({ "string.empty": t("content_required") }),
  sent_at: Joi.date().optional(),
  is_read: Joi.boolean().optional(),
});

class MessageController {
  static async index(req, res) {
    try {
      const messageModel = new Message();
      const messages = await messageModel.getAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const messageModel = new Message();
      const message = await messageModel.findOne(req.params.id);
      if (!message) {
        return res.status(404).json({ error: t("message_not_found") });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = messageSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const messageModel = new Message();
      const cleanedBody = { ...value, sent_at: value.sent_at || new Date() };

      const message = await messageModel.create(cleanedBody);
      res.status(201).json({ message: t("message_created"), message });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = messageUpdateSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const messageModel = new Message();
      const cleanedBody = { ...value };

      const message = await messageModel.update(req.params.id, cleanedBody);
      if (!message) {
        return res.status(404).json({ error: t("message_not_found") });
      }
      res.status(200).json({ message: t("message_updated"), message });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const messageModel = new Message();
      const deletedMessage = await messageModel.delete(req.params.id);
      if (!deletedMessage) {
        return res.status(404).json({ error: t("message_not_found") });
      }
      res.status(200).json({ message: t("message_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = MessageController;
