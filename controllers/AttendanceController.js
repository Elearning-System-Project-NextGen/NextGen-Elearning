const Attendance = require("../models/Attendance");
const Joi = require("joi");
const { t } = require("i18next");

const attendanceSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({ "string.empty": t("student_id_required") }),

  live_session_id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({ "string.empty": t("live_session_id_required") }),

  status: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({ "number.base": t("status_required") }),

  attended_at: Joi.date().optional(),

  attended: Joi.boolean().optional(),

  timestamp: Joi.date().optional(),
});

const updateAttendanceSchema = Joi.object({
  student_id: Joi.string()
    .hex()
    .length(24)
    .messages({ "string.empty": t("student_id_required") }),

  live_session_id: Joi.string()
    .hex()
    .length(24)
    .messages({ "string.empty": t("live_session_id_required") }),

  status: Joi.number()
    .integer()
    .min(0)
    .messages({ "number.base": t("status_required") }),

  attended_at: Joi.date(),

  attended: Joi.boolean(),

  timestamp: Joi.date(),
}).min(1);

class AttendanceController {
  static async index(req, res) {
    try {
      const attendanceModel = new Attendance();
      const attendances = await attendanceModel.getAll();
      res.status(200).json(attendances);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async view(req, res) {
    try {
      const attendanceModel = new Attendance();
      const attendance = await attendanceModel.findOne(req.params.id);
      if (!attendance) {
        return res.status(404).json({ error: t("attendance_not_found") });
      }
      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = attendanceSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const attendanceModel = new Attendance();
      const cleanedBody = {
        ...value,
        attended_at: value.attended_at || new Date(),
      };

      const attendance = await attendanceModel.create(cleanedBody);
      res.status(201).json({ message: t("attendance_created"), attendance });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async update(req, res) {
    try {
      const { error, value } = updateAttendanceSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }

      const attendanceModel = new Attendance();
      const cleanedBody = { ...value };

      const attendance = await attendanceModel.update(
        req.params.id,
        cleanedBody
      );
      if (!attendance) {
        return res.status(404).json({ error: t("attendance_not_found") });
      }
      res.status(200).json({ message: t("attendance_updated"), attendance });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }

  static async delete(req, res) {
    try {
      const attendanceModel = new Attendance();
      const deletedAttendance = await attendanceModel.delete(req.params.id);
      if (!deletedAttendance) {
        return res.status(404).json({ error: t("attendance_not_found") });
      }
      res.status(200).json({ message: t("attendance_deleted") });
    } catch (error) {
      res.status(500).json({ error: t("server_error") });
    }
  }
}

module.exports = AttendanceController;
