const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Profile, sequelize } = require("../models/");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      await sequelize.transaction(async (t) => {
        const newUser = await User.create({ email, password }, { transaction: t });
        await Profile.create({ UserId: newUser.id, username }, { transaction: t });
        res.status(201).json({ message: "New user created" });
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Cek apakah username terdaftar di db atau tidak
      const findUser = await Profile.findOne({
        where: { username },
        include: User,
      });
      if (!findUser) {
        throw { name: "invalid_username_password" };
      }

      // Cek apakah password sesuai atau tidak
      const isPasswordValid = comparePassword(password, findUser.User.password);
      if (!isPasswordValid) {
        throw { name: "invalid_username_password" };
      }

      // Buat access token
      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
