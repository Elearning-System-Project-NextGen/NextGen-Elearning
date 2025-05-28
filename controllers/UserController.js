const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { t } = require("i18next");

const userSchema = Joi.object({
  full_name: Joi.string()
    .allow("")
    .max(100)
    .messages({
      "string.max": t("full_name_max"),
    }),
  username: Joi.string()
    .required()
    .min(3)
    .max(50)
    .messages({
      "string.empty": t("username_required"),
      "string.min": t("username_min"),
      "string.max": t("username_max"),
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": t("email_invalid"),
      "string.empty": t("email_required"),
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": t("password_min"),
      "string.empty": t("password_required"),
    }),
  phone_number: Joi.string()
    .allow("")
    .max(20)
    .messages({
      "string.max": t("phone_number_max"),
    }),
  role_id: Joi.string()
    .required()
    .messages({
      "string.empty": t("role_id_required"),
    }),

  status: Joi.number()
    .integer()
    .min(0)
    .max(1)
    .default(1)
    .messages({
      "number.base": t("status_invalid"),
    }),
  language: Joi.string()
    .valid("en", "ar")
    .default("en")
    .messages({
      "any.only": t("language_invalid"),
    }),
});

const updateUserSchema = Joi.object({
  full_name: Joi.string()
    .allow("")
    .max(100)
    .messages({
      "string.max": t("full_name_max"),
    }),
  username: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.min": t("username_min"),
      "string.max": t("username_max"),
    }),
  email: Joi.string()
    .email()
    .messages({
      "string.email": t("email_invalid"),
    }),
  password: Joi.string()
    .min(6)
    .allow("")
    .messages({
      "string.min": t("password_min"),
    }),
  phone_number: Joi.string()
    .allow("")
    .max(20)
    .messages({
      "string.max": t("phone_number_max"),
    }),
  role_id: Joi.string().messages({
    "string.empty": t("role_id_required"),
  }),
  status: Joi.number()
    .integer()
    .min(0)
    .max(1)
    .messages({
      "number.base": t("status_invalid"),
    }),
  language: Joi.string()
    .valid("en", "ar")
    .messages({
      "any.only": t("language_invalid"),
    }),
});

class UserController {
  static async index(req, res) {
    try {
      const userModel = new User();
      const users = await userModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Index users error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const userModel = new User();
      const user = await userModel.findOne(req.params.id);
      if (!user) {
        return res.status(404).json({ error: t("user_not_found") });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("View user error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = userSchema.validate(req.body, {
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
      const role = await roleModel.findById(value.role_id);
      if (!role) {
        return res.status(400).json({ error: t("role_not_found") });
      }

      const userModel = new User();
      const existingUser = await userModel.findByEmail(value.email);
      if (existingUser) {
        return res.status(400).json({ error: t("email_already_exists") });
      }

      const cleanedBody = {
        ...value,
        password: await bcrypt.hash(value.password, 10),
      };

      const user = await userModel.create(cleanedBody);
      res.status(201).json({ message: t("user_created"), user });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = updateUserSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const userModel = new User();
      const cleanedBody = { ...value, updated_date: Date.now() };

      if (value.role_id) {
        const roleModel = new Role();
        const role = await roleModel.findOne(value.role_id);
        if (!role) {
          return res.status(400).json({ error: t("role_not_found") });
        }
      }

      if (value.email) {
        const existingUser = await userModel.findByEmail(value.email);
        if (existingUser && existingUser._id.toString() !== req.params.id) {
          return res.status(400).json({ error: t("email_already_exists") });
        }
      }

      if (value.password) {
        cleanedBody.password = await bcrypt.hash(value.password, 10);
      } else {
        delete cleanedBody.password;
      }

      const user = await userModel.update(req.params.id, cleanedBody);
      if (!user) {
        return res.status(404).json({ error: t("user_not_found") });
      }
      res.status(200).json({ message: t("user_updated"), user });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const userModel = new User();
      const deletedUser = await userModel.delete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: t("user_not_found") });
      }
      res.status(200).json({ message: t("user_deleted") });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = UserController;
