const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss");
const cookieParser = require("cookie-parser");
const http = require("http");
const Database = require("./config/db");
const SocketManager = require("./socket");
const ErrorMiddleware = require("./middleware/error");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const app = express();
const server = http.createServer(app);

// Custom XSS sanitization middleware
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

Database.connect();
SocketManager.setup(server);

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.use(ErrorMiddleware.handle);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
