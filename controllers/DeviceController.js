const Device = require("../models/Device");
const Joi = require("joi");
const { t } = require("i18next");

const deviceSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.empty": t("name_required"),
    }),
  bigid: Joi.number().integer().optional(),
  created_at: Joi.date().optional(),
});

class DeviceController {
  static async index(req, res) {
    try {
      const deviceModel = new Device();
      const devices = await deviceModel.getAll();
      res.status(200).json(devices);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const deviceModel = new Device();
      const device = await deviceModel.findOne(req.params.id);
      if (!device) {
        return res.status(404).json({ error: t("device_not_found") });
      }
      res.status(200).json(device);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async name(req, res) {
    try {
      const deviceModel = new Device();
      const name = await deviceModel.getName(req.params.id);
      if (!name) {
        return res.status(404).json({ error: t("device_not_found") });
      }
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = deviceSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const deviceModel = new Device();
      const cleanedBody = {
        ...value,
        created_at: value.created_at || new Date(),
      };

      const device = await deviceModel.create(cleanedBody);
      res.status(201).json({ message: t("device_created"), device });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = deviceSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const deviceModel = new Device();
      const cleanedBody = { ...value };

      const device = await deviceModel.update(req.params.id, cleanedBody);
      if (!device) {
        return res.status(404).json({ error: t("device_not_found") });
      }
      res.status(200).json({ message: t("device_updated"), device });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const deviceModel = new Device();
      const deletedDevice = await deviceModel.delete(req.params.id);
      if (!deletedDevice) {
        return res.status(404).json({ error: t("device_not_found") });
      }
      res.status(200).json({ message: t("device_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = DeviceController;
