const express = require("express");
const UserController = require("../controllers/UserController");
const router = express();

// REGISTER AND LOGIN
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
