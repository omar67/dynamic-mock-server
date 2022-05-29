"use strict";

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./data/db");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var errorRouter = require("./routes/error");
var urlRouter = require("./routes/url");
var pathRouter = require("./routes/path");

const { handleMockServer } = require("./controller/controller");
const errorLogger = require("./controller/errorLogger");
const errorHandler = require("./controller/errorHandler");
const { initRouter } = require("./routes/router");

// init db
db.sequelize.sync();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let paths = {
  "/": indexRouter,
  "/admin": adminRouter,
  "/url": urlRouter,
  "/path": pathRouter,
  "/error": errorRouter,
};
// init the application router
initRouter(app, paths);

// Catch all paths other than the predefined ones
app.use(handleMockServer);

// error logger
app.use(errorLogger);

// error handler
app.use(errorHandler);

module.exports = app;
