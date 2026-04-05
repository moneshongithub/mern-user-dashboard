const ActivityLog = require("../models/ActivityLog");

exports.logActivity = (action) => {
  return async (req, res, next) => {
    try {
      await ActivityLog.create({
        user: req.user ? req.user._id : null,
        action,
        ip: req.ip,
      });
    } catch (err) {
      console.error("Log error:", err.message);
    }
    next();
  };
};