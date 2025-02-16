const express = require("express");
const upload = require("../middleware/multer");
const {
  addNewUser,
  loginAdmin,
  getUsersList,
  toggleRestrictedValue,
} = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const adminRouter = express.Router();

adminRouter.post("/add-user", upload.single("image"), addNewUser);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/users-list", adminAuth, getUsersList);

adminRouter.post("/toggle-restricted", adminAuth, toggleRestrictedValue);

module.exports = adminRouter;
