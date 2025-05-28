const path = require("path");
const User = require("../models/User");
const Role = require("../models/Role");
const RolePermisssion = require("../models/RolePermission");
const Session = require("../models/Session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const SessionController = require("./SessionController");
const i18n = require(path.join(__dirname, "../config/i18n"));
const t = i18n.t.bind(i18n);
require("dotenv").config();

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": t("invalid_email"),
      "string.empty": t("email_required"),
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": t("password_min_length"),
      "string.empty": t("password_required"),
    }),
});

const registerSchema = Joi.object({
  full_name: Joi.string()
    .required()
    .messages({
      "string.empty": t("full_name_required"),
    }),
  username: Joi.string()
    .required()
    .messages({
      "string.empty": t("username_required"),
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": t("invalid_email"),
      "string.empty": t("email_required"),
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": t("password_min_length"),
      "string.empty": t("password_required"),
    }),
  phone_number: Joi.string().allow("").optional(),
  role_id: Joi.string().hex().length(24).optional(),
  language: Joi.string().valid("en", "ar").optional(),
});

class AuthController {
  static async login(req, res) {
    try {
      const { error, value } = loginSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const userModel = new User();
      const user = (await userModel.whereMore({ email: value.email }))?.[0];
      if (!user) {
        return res.status(400).json({ message: t("invalid_credentials") });
      }

      const isMatch = await bcrypt.compare(value.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: t("invalid_credentials") });
      }

      const roleModel = new Role();
      const roleDoc = await roleModel.findOne(user.role_id);

      if (!roleDoc) {
        return res.status(400).json({ message: t("role_not_found") });
      }

      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          username: user.username,
          name: user.full_name,
          role: roleDoc.name,
          role_id: user.role_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      await userModel.update(user._id, { last_login: new Date() });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });

      const rolePermissionModel = new RolePermisssion();
      const permissions = await rolePermissionModel.modelSchema
        .find({ role_id: user.role_id })
        .populate("permission_id");
      const permissionkeys = permissions
        .map((rp) => rp.permission_id?.permission_key)
        .filter(Boolean);

      const sessionModel = new Session();
      await sessionModel.createSession({
        user_id: user._id,
        token: token,
        device_id: req.body.device_id || null,
        role_id: user.role_id,
        permissions: JSON.stringify(permissionkeys),
        login_time: new Date(),
      });

      res.status(200).json({
        message: t("login_successful"),
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          name: user.full_name,
          role: roleDoc.name,
          role_id: user.role_id,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: t("server_error"), details: err.message });
    }
  }

  static async register(req, res) {
    try {
      const { role, ...dataToValidate } = req.body;

      const { error, value } = registerSchema.validate(dataToValidate, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      if (!role) {
        return res.status(400).json({ message: "Role is required." });
      }

      const roleModel = new Role();
      const roleDoc = await roleModel.modelSchema.findOne({ name: role });

      if (!roleDoc) {
        return res.status(400).json({ message: `Role '${role}' not found.` });
      }

      const userModel = new User();
      const userExists = (
        await userModel.whereMore({ email: value.email })
      )?.[0];
      if (userExists) {
        return res.status(400).json({ message: t("user_already_exists") });
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);
      const cleanedBody = {
        ...value,
        password: hashedPassword,
        role_id: roleDoc._id, 
        registration_date: new Date(),
        status: 1,
      };

      const user = await userModel.create(cleanedBody);
      res
        .status(201)
        .json({ message: t("user_registered_successfully"), user });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ error: t("server_error"), details: err.message });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.cookies?.token;

      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      const sessionModel = new Session();
      sessionModel.deleteCurrentSession(token);

      res.status(200).json({ message: t("logout_successful") });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ error: t("server_error"), details: err.message });
    }
  }
}

module.exports = AuthController;
