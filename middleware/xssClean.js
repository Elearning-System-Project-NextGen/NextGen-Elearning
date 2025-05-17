const sanitizeHtml = require("sanitize-html");

const xssCleanMiddleware = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") {
        if (value.includes('<script>')) {
          return res.status(400).json({ error: `Field '${key}' contains invalid characters (script tags).` });
        }
        req.body[key] = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
      }
    }
  }
  next();
};

module.exports = xssCleanMiddleware;