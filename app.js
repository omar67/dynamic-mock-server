"use strict";

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./data/db");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var urlRouter = require("./routes/url");
var pathRouter = require("./routes/path");

const { handleMockServer } = require("./controller/controller");
const errorLogger = require("./controller/errorLogger");
const errorHandler = require("./controller/errorHandler");

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

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/url", urlRouter);
app.use("/path", pathRouter);

// Catch all paths other than the predefined ones
app.use(handleMockServer);
// error logger
app.use(errorLogger);

// error handler
app.use(errorHandler);

module.exports = app;
