module.exports = function errorLogger(error, req, res, next) {
  console.log("Error: ", error);
  next(error);
};
