const Review = require("../models/Review");
const Joi = require("joi");
const { t } = require("i18next");

const reviewSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("student_id_required"),
    }),
  course_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": t("course_id_required"),
    }),
  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": t("rating_required"),
      "number.min": t("rating_min"),
      "number.max": t("rating_max"),
    }),
  comment: Joi.string().allow("").optional(),
  created_at: Joi.date().optional(),
});

class ReviewController {
  static async index(req, res) {
    try {
      const reviewModel = new Review();
      const reviews = await reviewModel.getAll();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const reviewModel = new Review();
      const review = await reviewModel.findOne(req.params.id);
      if (!review) {
        return res.status(404).json({ error: t("review_not_found") });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = reviewSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const reviewModel = new Review();
      const cleanedBody = {
        ...value,
        created_at: value.created_at || new Date(),
      };

      const review = await reviewModel.create(cleanedBody);
      res.status(201).json({ message: t("review_created"), review });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = reviewSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const reviewModel = new Review();
      const cleanedBody = { ...value };

      const review = await reviewModel.update(req.params.id, cleanedBody);
      if (!review) {
        return res.status(404).json({ error: t("review_not_found") });
      }
      res.status(200).json({ message: t("review_updated"), review });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const reviewModel = new Review();
      const deletedReview = await reviewModel.delete(req.params.id);
      if (!deletedReview) {
        return res.status(404).json({ error: t("review_not_found") });
      }
      res.status(200).json({ message: t("review_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = ReviewController;
