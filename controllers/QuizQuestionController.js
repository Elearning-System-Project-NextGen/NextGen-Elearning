const QuizQuestion = require("../models/QuizQuestion");
const Joi = require("joi");
const { t } = require("i18next");

const quizQuestionSchema = Joi.object({
  quiz_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("quiz_id_required"),
      "string.length": t("invalid_quiz_id_format"),
    }),

  question_text: Joi.object({
    en: Joi.string()
      .required()
      .messages({ "string.empty": t("question_text_en_required") }),
    ar: Joi.string()
      .required()
      .messages({ "string.empty": t("question_text_ar_required") }),
  }).required(),

  options: Joi.array()
    .items(
      Joi.object({
        text: Joi.object({
          en: Joi.string()
            .required()
            .messages({ "string.empty": t("option_text_en_required") }),
          ar: Joi.string()
            .required()
            .messages({ "string.empty": t("option_text_ar_required") }),
        }).required(),
        is_correct: Joi.boolean()
          .required()
          .messages({ "any.required": t("option_is_correct_required") }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": t("options_must_be_array"),
      "array.min": t("options_minimum_required"),
      "any.required": t("options_required"),
    }),

  score: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": t("score_must_be_number"),
      "number.min": t("score_minimum_1"),
      "any.required": t("score_required"),
    }),
});

class QuizQuestionController {
  static async index(req, res) {
    try {
      const quizQuestionModel = new QuizQuestion();
      const quizQuestions = await quizQuestionModel.getAll();
      res.status(200).json(quizQuestions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const quizQuestionModel = new QuizQuestion();
      const quizQuestion = await quizQuestionModel.findOne(req.params.id);
      if (!quizQuestion) {
        return res.status(404).json({ error: t("quiz_question_not_found") });
      }
      res.status(200).json(quizQuestion);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = quizQuestionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const quizQuestionModel = new QuizQuestion();
      const cleanedBody = { ...value };

      const quizQuestion = await quizQuestionModel.create(cleanedBody);
      res
        .status(201)
        .json({ message: t("quiz_question_created"), quizQuestion });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = quizQuestionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const quizQuestionModel = new QuizQuestion();
      const cleanedBody = { ...value };

      const quizQuestion = await quizQuestionModel.update(
        req.params.id,
        cleanedBody
      );
      if (!quizQuestion) {
        return res.status(404).json({ error: t("quiz_question_not_found") });
      }
      res
        .status(200)
        .json({ message: t("quiz_question_updated"), quizQuestion });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const quizQuestionModel = new QuizQuestion();
      const deletedQuizQuestion = await quizQuestionModel.delete(req.params.id);
      if (!deletedQuizQuestion) {
        return res.status(404).json({ error: t("quiz_question_not_found") });
      }
      res.status(200).json({ message: t("quiz_question_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = QuizQuestionController;
