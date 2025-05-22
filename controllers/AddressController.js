const Address = require("../models/Address");
const Joi = require("joi");
const { t } = require("i18next");

const addressSchema = Joi.object({
  country: Joi.string()
    .required()
    .messages({
      "string.empty": t("country_required"),
    }),
  city: Joi.string()
    .required()
    .messages({
      "string.empty": t("city_required"),
    }),
  street: Joi.string().allow("").optional(),
  postal_code: Joi.string().allow("").optional(),
});

const addressUpdateSchema = Joi.object({
  country: Joi.string(),
  city: Joi.string(),
  street: Joi.string().allow("").optional(),
  postal_code: Joi.string().allow("").optional(),
}).min(1);

class AddressController {
  static async index(req, res) {
    try {
      const addressModel = new Address();
      const addresses = await addressModel.getAll();
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const addressModel = new Address();
      const address = await addressModel.findOne(req.params.id);
      if (!address) {
        return res.status(404).json({ error: t("address_not_found") });
      }
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = addressSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const addressModel = new Address();
      const cleanedBody = { ...value };

      const address = await addressModel.create(cleanedBody);
      res.status(201).json({ message: t("address_created"), address });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = addressUpdateSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const addressModel = new Address();
      const cleanedBody = { ...value };

      const address = await addressModel.update(req.params.id, cleanedBody);
      if (!address) {
        return res.status(404).json({ error: t("address_not_found") });
      }
      res.status(200).json({ message: t("address_updated"), address });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const addressModel = new Address();
      const deletedAddress = await addressModel.delete(req.params.id);
      if (!deletedAddress) {
        return res.status(404).json({ error: t("address_not_found") });
      }
      res.status(200).json({ message: t("address_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = AddressController;
