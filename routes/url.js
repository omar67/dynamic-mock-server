var express = require("express");
const { addUrl, deleteUrl } = require("../data/data_access/urlDA");
var router = express.Router();

router.post("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  return await deleteUrl(id)
    .then((d) => {
      res.send("Deleted successfully");
    })
    .catch((e) => {
      res.send("Error deleting");
    });
});

router.post("/add", (req, res, next) => {
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
module.exports = router;
