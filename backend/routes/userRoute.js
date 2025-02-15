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

module.exports = userRouter;
