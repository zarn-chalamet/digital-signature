const express = require("express");
const upload = require("../middleware/multer");
const { addNewUser } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/add-user", upload.single("image"), addNewUser);

module.exports = adminRouter;
