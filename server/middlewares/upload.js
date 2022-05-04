const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    const imgName = Date.now() + file.originalname;

    cb(null, imgName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
