// const Session = require("../models/Session");
// const Joi = require("joi");
// const { t } = require("i18next");

// const sessionSchema = Joi.object({
//   user_id: Joi.string()
//     .hex()
//     .length(24)
//     .required()
//     .messages({
//       "string.empty": t("user_id_required"),
//     }),
//   device_id: Joi.string()
//     .hex()
//     .length(24)
//     .required()
//     .messages({
//       "string.empty": t("device_id_required"),
//     }),
//   token: Joi.string()
//     .required()
//     .messages({
//       "string.empty": t("token_required"),
//     }),
//   login_time: Joi.date().optional(),
//   logout_time: Joi.date().optional(),
// });

// class SessionController {
//   static async index(req, res) {
//     try {
//       const sessionModel = new Session();
//       const sessions = await sessionModel.getAll();
//       res.status(200).json(sessions);
//     } catch (error) {
//       res.status(500).json({ error: t("server_error") });
//     }
//   }

//   static async view(req, res) {
//     try {
//       const sessionModel = new Session();
//       const session = await sessionModel.findOne(req.params.id);
//       if (!session) {
//         return res.status(404).json({ error: t("session_not_found") });
//       }
//       res.status(200).json(session);
//     } catch (error) {
//       res.status(500).json({ error: t("server_error") });
//     }
//   }

//   static async create(req, res) {
//     try {
//       const { error, value } = sessionSchema.validate(req.body, {
//         abortEarly: false,
//       });
//       if (error) {
//         const errors = error.details.map((err) => ({
//           field: err.path.join("."),
//           message: err.message,
//         }));
//         return res.status(400).json({ errors });
//       }

//       const sessionModel = new Session();
//       const cleanedBody = {
//         ...value,
//         login_time: value.login_time || new Date(),
//       };

//       const session = await sessionModel.create(cleanedBody);
//       res.status(201).json({ message: t("session_created"), session });
//     } catch (error) {
//       res.status(500).json({ error: t("server_error") });
//     }
//   }

//   static async update(req, res) {
//     try {
//       const { error, value } = sessionSchema.validate(req.body, {
//         abortEarly: false,
//       });
//       if (error) {
//         const errors = error.details.map((err) => ({
//           field: err.path.join("."),
//           message: err.message,
//         }));
//         return res.status(400).json({ errors });
//       }

//       const sessionModel = new Session();
//       const cleanedBody = { ...value };

//       const session = await sessionModel.update(req.params.id, cleanedBody);
//       if (!session) {
//         return res.status(404).json({ error: t("session_not_found") });
//       }
//       res.status(200).json({ message: t("session_updated"), session });
//     } catch (error) {
//       res.status(500).json({ error: t("server_error") });
//     }
//   }

//   static async delete(req, res) {
//     try {
//       const sessionModel = new Session();
//       const deletedSession = await sessionModel.delete(req.params.id);
//       if (!deletedSession) {
//         return res.status(404).json({ error: t("session_not_found") });
//       }
//       res.status(200).json({ message: t("session_deleted") });
//     } catch (error) {
//       res.status(500).json({ error: t("server_error") });
//     }
//   }
// }

// module.exports = SessionController;

const Session = require("../models/Session");
const Joi = require("joi");
const { t } = require("i18next");

const sessionSchema = Joi.object({
  user_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "user_id_required",
    }),
  device_id: Joi.string()
    ,
  token: Joi.string()
    .required()
    .messages({
      "string.empty": "token_required",
    }),
  login_time: Joi.date().optional(),
  logout_time: Joi.date().optional(),
});

class SessionController {
  // ✅ Get all sessions
  static async index(req, res) {
    try {
      const sessionModel = new Session();
      const sessions = await sessionModel.getAll();
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ View session by ID
  static async view(req, res) {
    try {
      const sessionModel = new Session();
      const session = await sessionModel.findOne(req.params.id);
      if (!session) {
        return res.status(404).json({ error: t("session_not_found") });
      }
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ Create session
  static async create(req, res) {
    try {
      const { error, value } = sessionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const sessionModel = new Session();
      const session = await sessionModel.createSession({
        ...value,
        login_time: value.login_time || new Date(),
      });

      res.status(201).json({ message: t("session_created"), session });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ Update session
  static async update(req, res) {
    try {
      const { error, value } = sessionSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const sessionModel = new Session();
      const updated = await sessionModel.updateSession(req.params.id, value);

      if (!updated) {
        return res.status(404).json({ error: t("session_not_found") });
      }

      res.status(200).json({ message: t("session_updated"), session: updated });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ Delete session by ID
  static async delete(req, res) {
    try {
      const sessionModel = new Session();
      const deleted = await sessionModel.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: t("session_not_found") });
      }

      res.status(200).json({ message: t("session_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ Get current session by token
  static async current(req, res) {
    try {
      // const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

      const token =
        req.cookies?.token ||
        (req.headers.authorization?.startsWith("Bearer ")
          ? req.headers.authorization.split(" ")[1]
          : null);
      //

      if (!token) return res.status(400).json({ error: t("token_required") });

      const sessionModel = new Session();
      const session = await sessionModel.getCurrentSession(token);
      if (!session)
        return res.status(404).json({ error: t("session_not_found") });

      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ Delete current session by token
  static async deleteCurrent(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(400).json({ error: t("token_required") });

      const sessionModel = new Session();
      const deleted = await sessionModel.deleteCurrentSession(token);
      if (!deleted)
        return res.status(404).json({ error: t("session_not_found") });

      res.status(200).json({ message: t("session_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  // ✅ Delete all sessions by user_id
  static async deleteAll(req, res) {
    try {
      const { user_id } = req.body;
      if (!user_id)
        return res.status(400).json({ error: t("user_id_required") });

      const sessionModel = new Session();
      const result = await sessionModel.deleteAllSessions(user_id);

      res
        .status(200)
        .json({
          message: t("all_sessions_deleted"),
          deleted: result.deletedCount,
        });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = SessionController;
