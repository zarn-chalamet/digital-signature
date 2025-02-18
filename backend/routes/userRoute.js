const express = require("express");
const {
  logout,
  loginUser,
  sendResetOtp,
  resetPassword,
  isAuthenticated,
  getCurrentUser,
} = require("../controllers/userController");
const userAuth = require("../middleware/userAuth");
const {
  uploadTemplate,
  getAllTemplates,
  getAllTemplatesByUser,
  deleteTemplate,
  renameTemplateTitle,
  getTemplateByTemplateId,
} = require("../controllers/templateController");
const uploadPdf = require("../middleware/multerPdf");

const userRouter = express.Router();

//user login
userRouter.post("/login", loginUser);

//user logout
userRouter.post("/logout", logout);

//check if authenticated or not
userRouter.get("/is-auth", userAuth, isAuthenticated);

//send reset password otp
userRouter.post("/send-reset-otp", sendResetOtp);

//reset password
userRouter.post("/reset-password", resetPassword);

userRouter.get("/user-data", userAuth, getCurrentUser);

//upload template including pdf file
userRouter.post(
  "/upload-template",
  uploadPdf.single("pdf"),
  userAuth,
  uploadTemplate
);

userRouter.get("/templates", userAuth, getAllTemplatesByUser);

userRouter.post("/rename-template", userAuth, renameTemplateTitle);

userRouter.post("/delete-template", userAuth, deleteTemplate);

userRouter.get("/templates/:id", userAuth, getTemplateByTemplateId);

module.exports = userRouter;
