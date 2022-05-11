/**
 * The error logger logs the errors in the system if any
 */
module.exports = function errorLogger(error, req, res, next) {
  console.log("Error: ", error);
  next(error);
};
