const express = require("express");
const upload = require("../middleware/multer");
const { addNewUser, loginAdmin } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/add-user", upload.single("image"), addNewUser);

adminRouter.post("/login", loginAdmin);

module.exports = adminRouter;
