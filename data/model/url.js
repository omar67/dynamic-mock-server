const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Url = sequelize.define(
  "Url",
  {
    // Model attributes are defined here
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
module.exports = {
  Url,
};
