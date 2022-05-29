var express = require("express");
var router = express.Router();
var util = require("util");

const fs = require("fs");
const { json } = require("express/lib/response");

/* GET home page. */
router.get("/", async function (req, res, next) {
  fs.readFile("error.log", "utf8", (err, data) => {
    if (err) res.send(err).status(500);

    let d = `<pre>${data.replace(/\n/g, "<br />")}</pre>`;
    res.send(d);
  });
});

module.exports = router;
