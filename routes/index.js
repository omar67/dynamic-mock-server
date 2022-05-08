var express = require("express");
const { title } = require("../config");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: title });
});

module.exports = router;
