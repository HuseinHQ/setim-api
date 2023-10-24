const axios = require("axios");

const baseURL = "https://api.igdb.com/v4/games";
const headers = {
  "Client-ID": process.env["Client-ID"],
  Authorization: process.env.Authorization,
};

class GameController {
  static async getGamesWithPagination(req, res, next) {
    try {
      const { offset = 0, limit = 12 } = req.query;
      const { data } = await axios({
        method: "post",
        url: baseURL,
        data: `fields name; offset ${offset}; limit ${limit};`,
        headers,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getGameDetails(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios({
        method: "post",
        url: baseURL,
        data: `fields *; where id = ${id};`,
        headers,
      });

      if (data.length === 0) {
        throw { name: "game_not_found" };
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
