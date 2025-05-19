const Transaction = require("../models/Transaction");
const Joi = require("joi");
const { t } = require("i18next");

const transactionSchema = Joi.object({
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
  amount: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": t("amount_required"),
      "number.min": t("amount_min"),
    }),
  transaction_date: Joi.date().optional(),
  payment_method: Joi.string().allow("").optional(),
  status: Joi.number().integer().min(0).optional(),
});

class TransactionController {
  static async index(req, res) {
    try {
      const transactionModel = new Transaction();
      const transactions = await transactionModel.getAll();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const transactionModel = new Transaction();
      const transaction = await transactionModel.findOne(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: t("transaction_not_found") });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = transactionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const transactionModel = new Transaction();
      const cleanedBody = {
        ...value,
        transaction_date: value.transaction_date || new Date(),
      };

      const transaction = await transactionModel.create(cleanedBody);
      res.status(201).json({ message: t("transaction_created"), transaction });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = transactionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const transactionModel = new Transaction();
      const cleanedBody = { ...value };

      const transaction = await transactionModel.update(
        req.params.id,
        cleanedBody
      );
      if (!transaction) {
        return res.status(404).json({ error: t("transaction_not_found") });
      }
      res.status(200).json({ message: t("transaction_updated"), transaction });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const transactionModel = new Transaction();
      const deletedTransaction = await transactionModel.delete(req.params.id);
      if (!deletedTransaction) {
        return res.status(404).json({ error: t("transaction_not_found") });
      }
      res.status(200).json({ message: t("transaction_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = TransactionController;
