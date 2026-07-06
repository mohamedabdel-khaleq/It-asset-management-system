const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Function to create upload middleware
const upload = (folderName) => {
  // Storage Configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "..", "uploads", folderName);

      // Create folder 
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9);

      const extension = path.extname(file.originalname);

      cb(null, `${uniqueName}${extension}`);
    },
  });

  // Allow Images Only
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    },
  });
};

module.exports = upload;