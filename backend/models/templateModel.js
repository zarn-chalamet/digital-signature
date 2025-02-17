const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  uploaderId: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  filePath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Template", templateSchema);
