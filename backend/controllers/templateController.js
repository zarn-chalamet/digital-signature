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
      return res.json({ success: false, message: "User ID is required" });
    }

    const templates = await templateModel.find({ uploaderId: userId });
    return res.json({ success: true, templates });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Rename template title(user can rename the template uploaded by himself)
const renameTemplateTitle = async (req, res) => {
  try {
    const { userId, templateId, newTitle } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const template = await templateModel.findById(templateId);
    if (!template) {
      return res.json({
        success: false,
        message: "No template with provided template id",
      });
    }

    if (template.uploaderId !== userId) {
      return res.json({
        success: false,
        message: "You can't rename others' template",
      });
    }

    await templateModel.findByIdAndUpdate(templateId, { title: newTitle });

    return res.json({
      success: true,
      message: "Updated new title successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//delete template(user can delete the template uploaded by himself)
const deleteTemplate = async (req, res) => {
  try {
    const { userId, templateId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const template = await templateModel.findById(templateId);
    if (!template) {
      return res.json({
        success: false,
        message: "No template with provided template id",
      });
    }

    if (template.uploaderId !== userId) {
      return res.json({
        success: false,
        message: "You can't delete others' template",
      });
    }

    await templateModel.findByIdAndDelete(templateId);

    return res.json({
      success: true,
      message: "Deleted template successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get template by template id
const getTemplateByTemplateId = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await templateModel.findById(id);
    if (!template) {
      return res.json({
        success: false,
        message: "No template with provided template id",
      });
    }

    return res.json({ success: true, template });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get all the public templates for the other users(but no include the public templates from thes current user)
const getAllPublicTemplates = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    //public templates but exclude the ones created by the current user
    const templates = await templateModel.find({
      isPublic: true,
      uploaderId: { $ne: userId },
    });

    return res.json({ success: true, templates });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadTemplate,
  getAllTemplatesByUser,
  renameTemplateTitle,
  deleteTemplate,
  getTemplateByTemplateId,
  getAllPublicTemplates,
};
