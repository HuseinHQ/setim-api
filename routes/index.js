const express = require("express");
const router = express();
const UserController = require("../controllers/UserController");
const GameController = require("../controllers/GameController");
const LibraryController = require("../controllers/LibraryController");
const authentication = require("../middlewares/authentication");

// REGISTER AND LOGIN
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/games", GameController.getGamesWithPagination);
router.get("/games/:id", GameController.getGameDetails);

// ROUTES BELLOW NEED AUTHENTICATION
router.use(authentication);
router.post("/libraries", LibraryController.createLibrary);
router.get("/generate-midtrans-token", UserController.createMidtransToken);

module.exports = router;
