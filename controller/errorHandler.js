/**
 * The error handler displays the error to the client side based on environment selection
 */
module.exports = function errorHandler(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.send(error);
};
