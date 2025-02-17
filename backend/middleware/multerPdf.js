const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Use the 'uploads' folder as destination
    callback(null, "./files");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now();
    callback(null, uniqueSuffix + file.originalname);
  },
});
const uploadPdf = multer({ storage });

module.exports = uploadPdf;
