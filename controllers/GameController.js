const axios = require("axios");

const baseURL = "https://api.igdb.com/v4/games";

class GameController {
  static async getGamesWithPagination(req, res, next) {
    try {
      const { offset = 0, limit = 12 } = req.query;
      const { data } = await axios({
        method: "post",
        url: baseURL,
        data: `fields name; offset ${offset}; limit ${limit};`,
        headers: {
          "Client-ID": process.env["Client-ID"],
          Authorization: process.env.Authorization,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getPopularGames(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
