const { Path } = require("../model/path");

async function addPath(host, method, path) {
  return await Path.create({ host, method, path });
}

async function deletePath(id) {
  return Path.destroy({ where: { id } });
}
async function deleteAllPaths() {
  return Path.destroy({ truncate: true });
}

async function getAllPaths() {
  return await Path.findAll();
}
async function getPath(path, method) {
  return await Path.findOne({ where: { path, method } });
}
async function updatePathUrl(id, url) {
  return await Path.update({ host: url }, { where: { id } });
}

module.exports = {
  addPath,
  deletePath,
  getAllPaths,
  deleteAllPaths,
  getPath,
  updatePathUrl,
};
