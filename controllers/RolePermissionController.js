const RolePermission = require("../models/RolePermission");
const Joi = require("joi");
const { t } = require("i18next");

const rolePermissionSchema = Joi.object({
  role_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("role_id_required"),
    }),
  permission_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("permission_id_required"),
    }),
});

class RolePermissionController {
  static async index(req, res) {
    try {
      const rolePermissionModel = new RolePermission();
      const rolePermissions = await rolePermissionModel.getAll();
      res.status(200).json(rolePermissions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const rolePermissionModel = new RolePermission();
      const rolePermission = await rolePermissionModel.findOne(req.params.id);
      if (!rolePermission) {
        return res.status(404).json({ error: t("role_permission_not_found") });
      }
      res.status(200).json(rolePermission);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = rolePermissionSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const rolePermissionModel = new RolePermission();
      const cleanedBody = { ...value };

      const rolePermission = await rolePermissionModel.create(cleanedBody);

      res
        .status(201)
        .json({ message: t("role_permission_created"), rolePermission });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = rolePermissionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const rolePermissionModel = new RolePermission();
      const cleanedBody = { ...value };

      const rolePermission = await rolePermissionModel.update(
        req.params.id,
        cleanedBody
      );
      if (!rolePermission) {
        return res.status(404).json({ error: t("role_permission_not_found") });
      }
      res
        .status(200)
        .json({ message: t("role_permission_updated"), rolePermission });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const rolePermissionModel = new RolePermission();
      const deletedRolePermission = await rolePermissionModel.delete(
        req.params.id
      );
      if (!deletedRolePermission) {
        return res.status(404).json({ error: t("role_permission_not_found") });
      }
      res.status(200).json({ message: t("role_permission_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async getWithRelations(req, res) {
    console.log("🟢 getWithRelations method reached");
    try {
      const rolePermissionModel = new RolePermission();
      console.log("Model name:", rolePermissionModel.modelSchema.modelName);
      const result = await rolePermissionModel.modelSchema
        .find()
        .populate("role_id", "name")
        .populate("permission_id", "permission_key");

      res.status(200).json(result);
    } catch (error) {
      console.error("Error in getWithRelations:", error.message, error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = RolePermissionController;
