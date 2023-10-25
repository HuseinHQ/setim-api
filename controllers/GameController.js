const axios = require("axios");

const baseURL = "https://api.igdb.com/v4";
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
        url: baseURL + "/games",
        data: `fields id,name,cover,genres; offset ${offset}; limit ${limit};`,
        headers,
      });

      const gameDetailPromise = data.map(async (el) => {
        if (el.cover) {
          const { data } = await axios({
            method: "post",
            url: baseURL + "/covers",
            headers,
            data: `fields height,image_id,url,width; where id = ${el.cover};`,
          });

          el.cover = data.map((el) => {
            const img = el.url.split("/").at(-1);
            el.url = `https://images.igdb.com/igdb/image/upload/t_cover_big/${img}`;
            return el;
          });
        }

        if (el.genres) {
          const { data } = await axios({
            method: "post",
            url: baseURL + "/genres",
            data: `fields name; where id = (${el.genres.join(",")});`,
            headers,
          });

          el.genres = data;
        }
        return el;
      });

      const gameDetail = await Promise.all(gameDetailPromise);

      res.status(200).json(gameDetail);
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
