const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming there's a User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    recipients: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Assuming there's a User model
          required: true,
        },
        signed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    emailSubject: {
      type: String,
      required: true,
      trim: true,
    },
    emailMessage: {
      type: String,
      required: true,
      trim: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

module.exports = mongoose.model("Request", requestSchema);
