const bcrypt = require("bcryptjs");
const { v2: cloudinary } = require("cloudinary");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//create new user
const addNewUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const imageFile = req.file;

    if (!first_name || !last_name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //validate strong passwor
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //error while hashing password
    // const hashedPassword = await bcrypt.hash(password, 10);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const userData = {
      first_name,
      last_name,
      email,
      password: password,
      image: imageUrl,
      date: Date.now(),
    };

    console.log(userData);
    const newUser = new userModel(userData);
    await newUser.save();

    return res.json({ success: true, message: "New Doctor created" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  //check the inputs are null or not
  if (!email || !password) {
    return res.json({ success: false, message: "Invalid Email" });
  }

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getUsersList = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const toggleRestrictedValue = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User id is needed" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "No user with the provided id",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      isRestricted: !user.isRestricted,
    });

    return res.json({
      success: true,
      message: user.isRestricted ? "Unestricted" : "restricted",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//update user
const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    const imageFile = req.file;

    if (!id) {
      return res.json({ success: false, message: "User id is needed" });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "No user with the provided id",
      });
    }

    await userModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      email,
      password,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(id, { image: imageUrl });
    }

    return res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ success: false, message: "User id is needed" });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "No user with the provided id",
      });
    }

    await userModel.findByIdAndDelete(id);

    return res.json({ success: true, message: "Deleted user successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addNewUser,
  loginAdmin,
  getUsersList,
  toggleRestrictedValue,
  updateUserData,
  deleteUser,
};
