class ResponseHelper {
  static success(res, data, status = 200) {
    res.status(status).json({ success: true, data });
  }

  static error(res, error, status = 400) {
    res.status(status).json({ success: false, error });
  }
}

module.exports = ResponseHelper;