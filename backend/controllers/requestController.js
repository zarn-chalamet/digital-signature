const requestModel = require("../models/requestModel");

//create request
const createNewRequest = async (req, res) => {
  try {
    const {
      userId,
      recipients,
      emailSubject,
      emailMessage,
      templateId,
      title,
    } = req.body;

    if (
      !userId ||
      !recipients ||
      !emailSubject ||
      !emailMessage ||
      !templateId ||
      !title
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate recipients
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Recipients must be a non-empty array",
      });
    }

    const requestData = {
      senderId: userId,
      recipients,
      emailSubject,
      emailMessage,
      templateId,
      title,
    };

    const newRequest = new requestModel(requestData);
    await newRequest.save();

    //send email to notify the request

    return res.json({ success: true, message: "New Request Created" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//requests sent by the currentUser (My requests)
const getRequestsByCurrentUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const requests = await requestModel
      .find({ senderId: userId })
      .populate("recipients.userId", "first_name last_name email");

    return res.json({ success: true, requests });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//requests recieved from other users (Requests by others)
const getRequestsRecievedFromOtherUsers = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    // Find requests where the current user is in the recipients array
    const requests = await requestModel
      .find({ "recipients.userId": userId }) // Match recipient userId
      .populate("senderId", "first_name last_name email") // Get sender details
      .populate("recipients.userId", "first_name last_name email"); // Get recipient details

    return res.json({ success: true, requests });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get request by request id
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ success: false, message: "Request ID is required" });
    }

    // Fetch the request by ID and populate the template field
    const request = await requestModel.findById(id).populate("templateId");
    if (!request) {
      return res.json({ success: false, message: "Request not found" });
    }

    return res.json({ success: true, request });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestModel
      .find()
      .populate("senderId", "first_name last_name email") // Get sender details
      .populate("recipients.userId", "first_name last_name email"); // Get recipient details

    return res.json({ success: true, requests });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  createNewRequest,
  getRequestsByCurrentUser,
  getRequestsRecievedFromOtherUsers,
  getRequestById,
  getAllRequests,
};
