const multer = require("multer");
const fs = require("fs");
const path = require("path");

const dirPath = "uploads/";

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/quicktime", // .mov
    "video/x-msvideo", // .avi
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/zip",
    "application/x-zip-compressed",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only specific image, video, or document file types are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
