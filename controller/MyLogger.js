var fs = require("fs");
var util = require("util");
// var error_file = fs.createWriteStream(__dirname + "/error.log", { flags: "w" });
var log_stdout = process.stdout;

function logError(err) {
  let date_ob = new Date();
  const logMsg =
    "------- ERROR -------\n" + date_ob.toISOString() + "\n" + err + "\n";
  fs.appendFileSync("error.log", logMsg);
  //   error_file.write(util.format(logMsg) + "\n");
  log_stdout.write(util.format(logMsg) + "\n");
}

function logApiFailure(apiName, code, message) {
  let date_ob = new Date();

  const logMsg = `
  ------- API FAILURE -------
   Time: ${date_ob.toISOString()}
   API: ${apiName}
   Status Code: ${code}
   Error: ${message}
  ------- END -------`;
  //   error_file.write(util.format(logMsg) + "\n");
  fs.appendFileSync("error.log", logMsg);
  log_stdout.write(util.format(logMsg) + "\n");
}

module.exports = {
  logError,
  logApiFailure,
};
