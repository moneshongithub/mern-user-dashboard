const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { logActivity } = require("../middleware/activityLogger");


router.post("/register", register);
// router.post("/login", login);
router.post("/login", logActivity("LOGIN"), login);

module.exports = router;