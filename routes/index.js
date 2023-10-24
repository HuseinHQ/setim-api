const express = require("express");
const router = express();
const UserController = require("../controllers/UserController");
const GameController = require("../controllers/GameController");

// REGISTER AND LOGIN
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/games", GameController.getGamesWithPagination);

module.exports = router;
