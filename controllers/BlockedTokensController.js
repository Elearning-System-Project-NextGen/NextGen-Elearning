const BlockedTokens = require("../models/BlockedTokens");
const Joi = require("joi");
const { t } = require("i18next");

const blockedTokensSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      "string.empty": t("token_required"),
    }),
  created_at: Joi.date().optional(),
});

class BlockedTokensController {
  static async index(req, res) {
    try {
      const blockedTokensModel = new BlockedTokens();
      const blockedTokens = await blockedTokensModel.getAll();
      res.status(200).json(blockedTokens);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const blockedTokensModel = new BlockedTokens();
      const blockedToken = await blockedTokensModel.findOne(req.params.id);
      if (!blockedToken) {
        return res.status(404).json({ error: t("blocked_token_not_found") });
      }
      res.status(200).json(blockedToken);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = blockedTokensSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const blockedTokensModel = new BlockedTokens();
      const cleanedBody = {
        ...value,
        created_at: value.created_at || new Date(),
      };

      const blockedToken = await blockedTokensModel.create(cleanedBody);
      res
        .status(201)
        .json({ message: t("blocked_token_created"), blockedToken });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const blockedTokensModel = new BlockedTokens();
      const deletedBlockedToken = await blockedTokensModel.delete(
        req.params.id
      );
      if (!deletedBlockedToken) {
        return res.status(404).json({ error: t("blocked_token_not_found") });
      }
      res.status(200).json({ message: t("blocked_token_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = BlockedTokensController;
