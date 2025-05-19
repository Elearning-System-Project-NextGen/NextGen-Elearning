const Role = require("../models/Role");
const Joi = require("joi");
const { t } = require("i18next");

const roleSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.empty": t("name_required"),
    }),
});

class RoleController {
  static async index(req, res) {
    try {
      const roleModel = new Role();
      const roles = await roleModel.getAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const roleModel = new Role();
      const role = await roleModel.findOne(req.params.id);
      if (!role) {
        return res.status(404).json({ error: t("role_not_found") });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async name(req, res) {
    try {
      const roleModel = new Role();
      const name = await roleModel.getName(req.params.id);
      if (!name) {
        return res.status(404).json({ error: t("role_not_found") });
      }
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = roleSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const roleModel = new Role();
      const cleanedBody = { ...value };

      const role = await roleModel.create(cleanedBody);
      res.status(201).json({ message: t("role_created"), role });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = roleSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const roleModel = new Role();
      const cleanedBody = { ...value };

      const role = await roleModel.update(req.params.id, cleanedBody);
      if (!role) {
        return res.status(404).json({ error: t("role_not_found") });
      }
      res.status(200).json({ message: t("role_updated"), role });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const roleModel = new Role();
      const deletedRole = await roleModel.delete(req.params.id);
      if (!deletedRole) {
        return res.status(404).json({ error: t("role_not_found") });
      }
      res.status(200).json({ message: t("role_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = RoleController;
