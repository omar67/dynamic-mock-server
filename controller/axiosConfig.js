/**
 * This file contains the axios configuration
 * for each body. Currently the following types are supported
 * - form-data
 * - x-www-form-urlencoded
 * - application/json | json
 *
 * The configuration was created due to some failure in APIs handling the request.
 * The axios configuration solves these issues
 */
var qs = require("qs");
const FormData = require("form-data");
// Return the axios Configuration for form-data
function getFormDataConfig(headers, body, method) {
  let data = FormData();
  // generate FormData object from json
  for (var key in body) {
    data.append(key, body[key]);
  }

  return {
    method: method,
    headers: {
      ...headers,
      Accept: "*/*",
      "Accept-Encoding": "gzip,deflate,br",
      Connection: "keep-alive",
      "Connection-Type": "application/json",
      "x-api-key": "liCENcCCGpHUsEPHNhySYGXCnmhwzZ",
      ...data.getHeaders(),
    },
    data: data,
  };
}

// return the axios Configuration for x-www-form-urlencoded
function getUrlEncodedConfig(headers, body, method) {
  let data = qs.stringify(body);
  return {
    method: method,
    headers: headers,
    data: data,
  };
}

// return the axios Configuration for JSON
function getJsonDataConfig(headers, body, method) {
  let data = JSON.stringify(body);

  return {
    method: method,
    headers: {
      ...headers,
      Accept: "*/*",
      "Accept-Encoding": "gzip,deflate,br",
      Connection: "keep-alive",
      "Connection-Type": "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  };
}
/** Returns the post request configuration for Axios client
 * @returns {import("axios").AxiosRequestConfig} Axios's request configuration
 */
function getRequestConfig(req, method) {
  let contentType = req.headers["content-type"];

  // delete unnecessary headers
  delete req.headers["content-length"];
  delete req.headers["Content-Length"];
  delete req.headers["host"];

  var config = {};

  if (contentType.includes("form-data")) {
    // Form data
    config = getFormDataConfig(req.headers, req.body, method);
  } else if (contentType.includes("x-www-form-urlencoded")) {
    // URL-encoded
    config = getUrlEncodedConfig(req.headers, req.body, method);
  } else if (contentType == "application/json") {
    // JSON
    config = getJsonDataConfig(req.headers, req.body, method);
  }
  return config;
}

module.exports = {
  getRequestConfig,
};
