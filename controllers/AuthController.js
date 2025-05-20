const path = require("path");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const i18n = require(path.join(__dirname, "../config/i18n")); // مسار جديد
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

    // sign JWT with role name, not role_id
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        username: user.username,
        name: user.full_name,
        role: roleDoc.name,  // <-- role name here
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    await userModel.update(user._id, { last_login: new Date() });

    res.json({
      token,
      email: user.email,
      username: user.username,
      name: user.full_name,
      role: roleDoc.name,  // <-- role name here
    });
  } catch (err) {
    res.status(500).json({ error: t("server_error") });
    }
  }

  static async register(req, res) {
    try {
      const { error, value } = registerSchema.validate(req.body, {
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
        registration_date: new Date(),
        status: 1,
      };

      const user = await userModel.create(cleanedBody);
      res
        .status(201)
        .json({ message: t("user_registered_successfully"), user });
    } catch (err) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = AuthController;
