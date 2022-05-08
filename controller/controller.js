const { default: axios } = require("axios");
const { accepts } = require("express/lib/request");
const createError = require("http-errors");
const { urls } = require("../config");
var axiosService = axios;

async function handleMockServer(req, res, next) {
  axiosService = axios.create({
    headers: {
      post: req.headers,
    },
  });
  var response = "";
  if (req.method == "GET") response = await getRequestHelper(req);
  else if (req.method == "POST") response = await postRequestHelper(req);
  else if (req.method == "PATCH") response = await patchRequestHelper(req);
  else createError("Method not allowed");

  return res.json(response);
}
// -- GET --
/**
 *  Handles the GET request and return the response.
 * @returns {Object}
 */
async function getRequestHelper(req) {
  return await getRequest(req, urls[0], 0);
}

/**
 * Recursion method to call GET api from the list of urls.
 */
async function getRequest(req, url, index) {
  if (!url) return createError("Sorry, All urls failed");

  try {
    let response = await axiosService.get(url + req.originalUrl);
    if (isSuccess(response.status)) return response?.data ?? undefined;
    else return await getRequest(req, urls[index], index + 1);
  } catch (e) {
    console.error("Exception thrown:", e);
    return await getRequest(req, urls[index], index + 1);
  }
}

// -- POST --
/**
 *  Handles the POST request and return the response.
 * @returns {Object}
 */
async function postRequestHelper(req) {
  return await postRequest(req, urls[0], 0);
}

/**
 * Recursion method to call POST api from the list of urls.
 */
async function postRequest(req, url, index) {
  if (!url) return createError("Sorry, All urls failed");
  try {
    let response = await axiosService.post(url + req.originalUrl, req.body);
    if (isSuccess(response.status)) return response?.data ?? undefined;
    else return await postRequest(req, urls[index], index + 1);
  } catch (e) {
    console.error("Exception thrown:", e);
    return await postRequest(req, urls[index], index + 1);
  }
}

// -- PATCH --
/**
 *  Handles the PATCH request and return the response.
 * @returns {Object}
 */
async function patchRequestHelper(req) {
  return await patchRequest(req, urls[0], 0);
}

/**
 * Recursion method to call PATCH api from the list of urls.
 */
async function patchRequest(req, url, index) {
  if (!url) return createError("Sorry, All urls failed");

  try {
    let response = await axiosService.patch(url + req.originalUrl, req.body);
    if (isSuccess(response.status)) return response?.data ?? undefined;
    else return await patchRequest(req, urls[index], index + 1);
  } catch (e) {
    console.error("Exception thrown:", e);
    return await patchRequest(req, urls[index], index + 1);
  }
}

/**
 * Determine whether the response is success status code.
 * @param {Number} code
 */
function isSuccess(code) {
  return code >= 200 && code < 300;
}

module.exports = {
  handleMockServer,
};
