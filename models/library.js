"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Library.belongsTo(models.User);
    }
  }
  Library.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
        },
      },
      GameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
        },
      },
      isComplete: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate(library) {
          library.isComplete = false;
        },
      },
      sequelize,
      modelName: "Library",
    }
  );
  return Library;
};
