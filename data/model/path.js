const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Path = sequelize.define("Path", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  path: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  host: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = {
  Path,
};
