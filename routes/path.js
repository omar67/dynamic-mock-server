var express = require("express");
const {
  addPath,
  deletePath,
  updatePathUrl,
} = require("../data/data_access/pathDA");
var router = express.Router();

router.post("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  return await deletePath(id)
    .then((d) => {
      res.send("Deleted successfully");
    })
    .catch((e) => {
      res.send("Error deleting");
    });
});

router.post("/add", (req, res, next) => {
  const { host, method, path } = req.body;
  if (!method || !path) return res.status(400).send("Missing host params");
  addPath(host, method, path)
    .then((d) => {
      res.status(201).send("Added successfully");
    })
    .catch((e) => {
      console.error(e);
      res.status(400).send("Failed to add");
    });
});

router.post("/update", (req, res, next) => {
  const { id, url } = req.body;
  if (!id || !url) return res.status(400).send("Missing host params");
  updatePathUrl(id, url)
    .then((d) => {
      res.status(201).send("Updated successfully");
    })
    .catch((e) => {
      console.error(e);
      res.status(400).send("Failed to add");
    });
});

module.exports = router;
