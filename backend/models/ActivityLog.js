const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String, // e.g., LOGIN, CREATE_USER, DELETE_USER
    },
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);