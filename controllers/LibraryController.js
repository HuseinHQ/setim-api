const { Library } = require("../models/");

class LibraryController {
  static async createLibrary(req, res, next) {
    try {
      const { GameId } = req.body;

      const newLibrary = await Library.create({
        UserId: req.user.id,
        GameId,
      });

      res.status(201).json(newLibrary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LibraryController;
