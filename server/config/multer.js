const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = (folderName) => {

  const storage = multer.diskStorage({

    destination: (req, file, cb) => {

      const uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        folderName
      );

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },


    filename: (req, file, cb) => {

      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9);

      const extension = path.extname(file.originalname);

      cb(null, `${uniqueName}${extension}`);
    },

  });


  const fileFilter = (req, file, cb) => {

    const allowedTypes = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();


    if (
      file.mimetype.startsWith("image/") &&
      allowedTypes.includes(extension)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        ),
        false
      );
    }

  };


  return multer({

    storage,

    fileFilter,

    limits: {
      fileSize: 5 * 1024 * 1024,
    },

  });

};


module.exports = upload;