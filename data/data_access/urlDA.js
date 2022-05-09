const { Url } = require("../model/url");

async function addUrl(host, method) {
  return await Url.create({ host, method });
}

async function deleteUrl(id) {
  return Url.destroy({ where: { id } });
}
async function deleteAll() {
  return Url.destroy({ truncate: true });
}

async function getAllUrls() {
  return await Url.findAll();
}

module.exports = {
  addUrl,
  deleteUrl,
  getAllUrls,
  deleteAll,
};
