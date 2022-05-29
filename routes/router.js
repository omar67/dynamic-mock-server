function initRouter(app, paths) {
  for (const [path, router] of Object.entries(paths)) {
    app.use(path, router);
  }
}
module.exports = {
  initRouter,
};
