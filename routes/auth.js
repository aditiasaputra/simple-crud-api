const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateLogin = require("../middlewares/validateLogin");
const validateRegister = require("../middlewares/validateRegister");

router.post("/login", validateLogin, authController.login);
router.post("/register", validateRegister, authController.register);

module.exports = router;
