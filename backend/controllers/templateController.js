const { v2: cloudinary } = require("cloudinary");
const templateModel = require("../models/templateModel");
const fs = require("fs");

//create template including
const uploadTemplate = async (req, res) => {
  try {
    const { userId, isPublic, title } = req.body;
    console.log(req.file);

    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const pdfFile = req.file.path;

    // const fileUpload = await cloudinary.uploader.upload(pdfFile, {
    //   resource_type: "raw",
    //   access_mode: "public",
    // });
    // const fileUrl = fileUpload.secure_url;

    const newTemplate = new templateModel({
      uploaderId: userId,
      title,
      isPublic,
      filePath: req.file.filename,
      uploadedAt: Date.now(),
    });
    await newTemplate.save();

    // Delete the locally uploaded file (since it's already uploaded to Cloudinary)
    // fs.unlinkSync(req.file.path);

    return res.json({
      success: true,
      message: "Uploaded template successfully.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get all templates
const getAllTemplatesByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const templates = await templateModel.find({ uploaderId: userId });
    return res.json({ success: true, templates });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { uploadTemplate, getAllTemplatesByUser };
