const { Sequelize } = require("sequelize");

// Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./urls.sqlite",
});

module.exports = {
  sequelize,
};
