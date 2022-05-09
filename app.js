var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./data/db");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");

const { default: axios } = require("axios");
const { handleMockServer } = require("./controller/controller");
const { deleteUrl, addUrl } = require("./data/data_access/urlDA");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", adminRouter);

app.post("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  return await deleteUrl(id)
    .then((d) => {
      res.send("Deleted successfully");
    })
    .catch((e) => {
      res.send("Error deleting");
    });
});

app.post("/add", (req, res, next) => {
  const { host, method } = req.body;
  if (!host) return res.status(400).send("Missing host params");
  addUrl(host, method ?? "POST")
    .then((d) => {
      res.status(201).send("Added successfully");
    })
    .catch((e) => {
      res.status(400).send("Failed to add");
    });
});

// init db
db.sequelize.sync();

// catch 404 and forward to error handler
app.use(async function (req, res, next) {
  // next(createError(404));
  // next(middleware(req, res, next));
  handleMockServer(req, res, next);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
