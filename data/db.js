const { Sequelize } = require("sequelize");

// Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/urls.sqlite",
});

module.exports = {
  sequelize,
};
