const Joi = require('joi');

class ValidateMiddleware {
  static validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  }
}

module.exports = ValidateMiddleware;