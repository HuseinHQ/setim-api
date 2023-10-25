const { Library } = require("../models/");
const axios = require("axios");

const baseURL = "https://api.igdb.com/v4";
const headers = {
  "Client-ID": process.env["Client-ID"],
  Authorization: process.env.Authorization,
};

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

  static async getLibraries(req, res, next) {
    try {
      const libraries = await Library.findAll({
        where: { UserId: req.user.id },
      });

      const libraryDetailPromises = libraries.map(async (library) => {
        const libraryObj = library.get({ plain: true }); // Convert Sequelize instance to plain object

        let { data } = await axios({
          method: "post",
          url: baseURL + "/games",
          headers,
          data: `fields cover,genres,name,summary; where id = ${library.GameId};`,
        });

        libraryObj.game_detail = data[0];
        if (libraryObj.game_detail.genres) {
          const genres = libraryObj.game_detail.genres.join(",");

          const { data } = await axios({
            method: "post",
            url: baseURL + "/genres",
            data: `fields name; where id = (${genres});`,
            headers,
          });

          libraryObj.game_detail.genres = data;
        }

        if (libraryObj.game_detail.cover) {
          const cover = libraryObj.game_detail.cover;

          const { data } = await axios({
            method: "post",
            url: baseURL + "/covers",
            data: `fields url; where id = (${cover});`,
            headers,
          });

          libraryObj.game_detail.cover = data[0];
        }

        return libraryObj;
      });

      const libraryDetail = await Promise.all(libraryDetailPromises);

      res.status(200).json(libraryDetail);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LibraryController;
