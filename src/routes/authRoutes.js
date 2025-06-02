const { Router } = require("express");
const router = Router();

const { register, login, account } = require("../controllers/authController");

const { registerValidation, loginValidation } = require("../validations/auth");
const { handleValidationErrors } = require("../validations/error");

const protectAuth = require("../middleware/protectAuth");

router.post("/register", registerValidation, handleValidationErrors, register);
router.post("/login", loginValidation, handleValidationErrors, login);
router.get("/account", protectAuth, account);

module.exports = router;
