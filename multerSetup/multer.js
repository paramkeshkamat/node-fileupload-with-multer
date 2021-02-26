const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  const acceptedFormat = ["image/jpg", "image/jpeg", "image/png"];
  if (acceptedFormat.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;
