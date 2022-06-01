const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Url = sequelize.define(
  "Url",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
module.exports = {
  Url,
};
