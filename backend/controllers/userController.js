const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ActivityLog = require("../models/ActivityLog");

// 🔹 GET ALL USERS (with pagination, search, filters)
exports.getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status, lastActive } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    // 🔍 Search (name/email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // 🔘 Status filter
    if (status) {
      query.status = status;
    }

    // ⏱️ Last activity filter
    if (lastActive === "24h") {
      const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
      query.lastActivity = { $gte: date };
    } else if (lastActive === "7d") {
      const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      query.lastActivity = { $gte: date };
    } else if (lastActive === "inactive") {
      const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      query.lastActivity = { $lt: date };
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 CREATE USER
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      status: status || "active",
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { name, email, status, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.status = status || user.status;
    user.role = role || user.role;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ACTIVITY LOGS API


exports.getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};