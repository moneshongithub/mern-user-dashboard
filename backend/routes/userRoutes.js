const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getLogs,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { logActivity } = require("../middleware/activityLogger");

// All routes protected + admin only
router.use(protect, adminOnly);

router.get("/logs", getLogs);

router.get("/", getUsers);
router.post("/", logActivity("CREATE_USER"), createUser);
router.put("/:id", logActivity("UPDATE_USER"), updateUser);
router.delete("/:id", logActivity("DELETE_USER"), deleteUser);

module.exports = router;