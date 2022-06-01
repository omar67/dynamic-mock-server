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
  const { name, host } = req.body;
  if (!host) return res.status(400).send("Missing host params");
  addUrl(name, host)
    .then((d) => {
      res.status(201).send("Added successfully");
    })
    .catch((e) => {
      console.log("Adding failure", e);
      res.status(400).send("Failed to add");
    });
});
module.exports = router;
