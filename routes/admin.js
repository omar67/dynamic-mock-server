var express = require("express");
const { title } = require("../config");
const { getAllPaths } = require("../data/data_access/pathDA");
const { getAllUrls } = require("../data/data_access/urlDA");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("admin", {
    title: title,
    urls: await getAllUrls(),
    paths: await getAllPaths(),
  });
});

module.exports = router;
