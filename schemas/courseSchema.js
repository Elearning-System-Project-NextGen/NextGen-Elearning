const Joi = require('joi');

const courseSchema = Joi.object({
  subject_id: Joi.string().required(),
  title_en: Joi.string().min(3).required(),
  title_ar: Joi.string().min(3).optional(),
  description_en: Joi.string().optional(),
  description_ar: Joi.string().optional()
});

module.exports = courseSchema;