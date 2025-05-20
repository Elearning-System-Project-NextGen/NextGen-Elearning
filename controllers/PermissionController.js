const Permission = require("../models/Permission");
const Joi = require("joi");
const { t } = require("i18next");

const permissionSchema = Joi.object({
  permission_key: Joi.string()
    .required()
    .messages({
      "string.empty": t("permission_key_required"),
    }),
});

class PermissionController {
  
  static async index(req, res) {
    try {
      const permissionModel = new Permission();
      const permissions = await permissionModel.getAll();
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const permissionModel = new Permission();
      const permission = await permissionModel.findOne(req.params.id);
      if (!permission) {
        return res.status(404).json({ error: t("permission_not_found") });
      }
      res.status(200).json(permission);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = permissionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const permissionModel = new Permission();
      const cleanedBody = { ...value };

      const permission = await permissionModel.create(cleanedBody);
      res.status(201).json({ message: t("permission_created"), permission });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = permissionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const permissionModel = new Permission();
      const cleanedBody = { ...value };

      const permission = await permissionModel.update(
        req.params.id,
        cleanedBody
      );
      if (!permission) {
        return res.status(404).json({ error: t("permission_not_found") });
      }
      res.status(200).json({ message: t("permission_updated"), permission });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const permissionModel = new Permission();
      const deletedPermission = await permissionModel.delete(req.params.id);
      if (!deletedPermission) {
        return res.status(404).json({ error: t("permission_not_found") });
      }
      res.status(200).json({ message: t("permission_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = PermissionController;
