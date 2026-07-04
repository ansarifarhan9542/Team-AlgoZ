const multer = require('multer');
const path = require('path');
const ApiError = require('../utils/ApiError');

/**
 * Generic multer factory. `subfolder` controls where files land under /uploads
 * (e.g. 'profile-pictures' or 'documents').
 */
const makeUploader = (subfolder, allowedTypes = /jpeg|jpg|png|pdf|doc|docx/) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads', subfolder));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extValid) return cb(null, true);
    cb(new ApiError(400, 'Unsupported file type'));
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });
};

module.exports = { makeUploader };
