const axios = require("axios");

const baseURL = "https://api.igdb.com/v4";
const headers = {
  "Client-ID": process.env["Client-ID"],
  Authorization: process.env.Authorization,
};

class GameController {
  static async getGamesWithPagination(req, res, next) {
    try {
      let { offset = 0, limit = 12 } = req.query;
      offset = (offset - 1) * limit;
      const { data } = await axios({
        method: "post",
        url: baseURL + "/games",
        data: `fields id,name,cover,genres,total_rating_count; offset ${offset}; limit ${limit}; sort total_rating_count desc; where total_rating_count != null;`,
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
        url: baseURL + "/games",
        data: `fields cover,first_release_date,genres,name,rating,rating_count,screenshots,storyline,summary; where id = ${id};`,
        headers,
      });

      if (data.length === 0) {
        throw { name: "game_not_found" };
      }

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
            el.url = `https://images.igdb.com/igdb/image/upload/t_720p/${img}`;
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

        if (el.screenshots) {
          const { data } = await axios({
            method: "post",
            url: baseURL + "/screenshots",
            headers,
            data: `fields height,image_id,url,width; where id = (${el.screenshots.join(",")});`,
          });

          el.screenshots = data.map((el) => {
            const img = el.url.split("/").at(-1);
            el.url = `https://images.igdb.com/igdb/image/upload/t_720p/${img}`;
            return el;
          });
        }

        return el;
      });

      const gameDetail = await Promise.all(gameDetailPromise);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
