const Joi = require('joi');

const userSchema = Joi.object({
  full_name: Joi.string().min(2).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'teacher', 'admin').required(),
  language: Joi.string().valid('en', 'ar').optional()
});

module.exports = userSchema;