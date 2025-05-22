const Quiz = require("../models/Quiz");
const Joi = require("joi");
const { t } = require("i18next");

const quizSchema = Joi.object({
  course_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("course_id_required"),
    }),

  title: Joi.object({
    en: Joi.string()
      .required()
      .messages({
        "string.empty": t("title_en_required"),
      }),
    ar: Joi.string()
      .required()
      .messages({
        "string.empty": t("title_ar_required"),
      }),
  }).required(),

  description: Joi.object({
    en: Joi.string()
      .required()
      .messages({
        "string.empty": t("description_en_required"),
      }),
    ar: Joi.string()
      .required()
      .messages({
        "string.empty": t("description_ar_required"),
      }),
  }).required(),

  questions: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
        .messages({
          "string.hex": t("invalid_question_id"),
        })
    )
    .optional(),

  total_score: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": t("total_score_required"),
      "number.min": t("total_score_min"),
    }),

  duration: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      "number.min": t("duration_min"),
    }),

  is_published: Joi.boolean().optional(),

  created_at: Joi.date().optional(),
});

const updateQuizSchema = Joi.object({
  course_id: Joi.string()
    .hex()
    .length(24)
    .messages({
      "string.hex": t("invalid_course_id"),
    }),

  title: Joi.object({
    en: Joi.string().messages({
      "string.empty": t("title_en_required"),
    }),
    ar: Joi.string().messages({
      "string.empty": t("title_ar_required"),
    }),
  }).optional(),

  description: Joi.object({
    en: Joi.string().messages({
      "string.empty": t("description_en_required"),
    }),
    ar: Joi.string().messages({
      "string.empty": t("description_ar_required"),
    }),
  }).optional(),

  questions: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
        .messages({
          "string.hex": t("invalid_question_id"),
        })
    )
    .optional(),

  total_score: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.min": t("total_score_min"),
    }),

  duration: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.min": t("duration_min"),
    }),

  is_published: Joi.boolean().optional(),
  created_at: Joi.date().optional(),
}).min(1);

class QuizController {
  static async index(req, res) {
    try {
      const quizModel = new Quiz();
      const quizzes = await quizModel.getAll();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const quizModel = new Quiz();
      const quiz = await quizModel.findOne(req.params.id);
      if (!quiz) {
        return res.status(404).json({ error: t("quiz_not_found") });
      }
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = quizSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const quizModel = new Quiz();
      const cleanedBody = { ...value };

      const quiz = await quizModel.create(cleanedBody);
      res.status(201).json({ message: t("quiz_created"), quiz });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = updateQuizSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const quizModel = new Quiz();
      const cleanedBody = { ...value };

      const quiz = await quizModel.update(req.params.id, cleanedBody);
      if (!quiz) {
        return res.status(404).json({ error: t("quiz_not_found") });
      }
      res.status(200).json({ message: t("quiz_updated"), quiz });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const quizModel = new Quiz();
      const deletedQuiz = await quizModel.delete(req.params.id);
      if (!deletedQuiz) {
        return res.status(404).json({ error: t("quiz_not_found") });
      }
      res.status(200).json({ message: t("quiz_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = QuizController;
