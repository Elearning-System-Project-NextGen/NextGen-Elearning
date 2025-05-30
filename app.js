const express = require("express");
const mongoose = require("mongoose");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const rolePermissionRoutes = require("./routes/rolePermissionRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoutes = require("./routes/quizRoutes");
const quizQuestionRoutes = require("./routes/quizQuestionRoutes");
const studentQuizAttemptRoutes = require("./routes/studentQuizAttemptRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const liveSessionRoutes = require("./routes/liveSessionRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const studentProgressRoutes = require("./routes/studentProgressRoutes");
const messageRoutes = require("./routes/messageRoutes");
const addressRoutes = require("./routes/addressRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const blockedTokensRoutes = require("./routes/blockedTokensRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const sanitizeHtml = require("sanitize-html");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const BlockedTokens = require("./models/BlockedTokens");
const userRoutes = require("./routes/userRoutes");
const axios = require("axios"); // Add axios for Gemini API calls

const app = express();
app.use(cookieParser());

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });

const sanitizeObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return typeof obj === "string"
      ? sanitizeHtml(obj, { allowedTags: ["img"] })
      : obj;
  }

  const sanitized = Array.isArray(obj) ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }
  return sanitized;
};

const xssCleanMiddleware = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body);
  }
  next();
};

var whitelist = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:5174",
];
//
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

const apiLimiter = rateLimit({
  max: 100,
  windowMs: 1000 * 30,
  message: "Too many requests from this IP, please try again later",
  handler: async (req, res, next, options) => {
    const token = req.cookies?.token;
    if (token) {
      const blockedTokenModel = new BlockedTokens();
      await blockedTokenModel.create({ token });
    }
    return res.status(options.statusCode).send(options.message);
  },
});

app.use("/api/", apiLimiter);

// Middlewares
app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());
app.use(xssCleanMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/role-permissions", rolePermissionRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quiz-questions", quizQuestionRoutes);
app.use("/api/student-quiz-attempts", studentQuizAttemptRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/live-sessions", liveSessionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/student-progress", studentProgressRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/blocked-tokens", blockedTokensRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/users", userRoutes);

// New Gemini API route
app.post("/api/gemini", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: req.t("invalid_input") });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: text,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;
    res.json({ response: aiText });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: req.t("server_error") });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: req.t("server_error") });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
