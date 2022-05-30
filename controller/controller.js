const { default: axios } = require("axios");
const { getAllPaths, getPath } = require("../data/data_access/pathDA");
const { getAllUrls } = require("../data/data_access/urlDA");
const MyGenericError = require("../data/errors/MyGenricError");
const { getRequestConfig } = require("./axiosConfig");
const { logApiFailure } = require("./MyLogger");

var axiosService = axios;

/**
 * The main controller for the mock server. which handles all of the requests and send
 * the response back to client. in case of failure jump to next function
 */
async function handleMockServer(req, res, next) {
  axiosService = axios.create({});

  try {
    var response = await requestHandler(req);
    return res.send(response);
  } catch (err) {
    next(err);
  }
}

/**
 * Request handler determines what is the current received request, and resend it back
 * to the server
 * @returns
 */
async function requestHandler(req) {
  let urls = await getUrls(); // get all the urls
  let path = await findPath(req.originalUrl, req.method); // get all the predefined paths objects
  var response = "";

  if (req.method == "GET") response = await getRequestHelper(req, urls, path);
  else if (req.method == "POST")
    response = await postRequestHelper(req, urls, path);
  else if (req.method == "PATCH")
    response = await patchRequestHelper(req, urls, path);
  else throw new MyGenericError("Method not allowed", 405);
  return response;
}
// -- GET --
/**
 *  Handles the GET request and return the response.
 * @returns {Object}
 */
async function getRequestHelper(req, urls, path) {
  if (path) return await getRequest(req, getPathUrl(urls, path), 0);

  return await getRequest(req, urls, 0);
}

/**
 * Find path object from path name
 * @param {String} path - Path to be searched
 * @returns {Path} returns the path object from the path
 */
async function findPath(path, method) {
  return await getPath(path, method);
}

function createURLsError() {
  throw new MyGenericError("Sorry, All urls failed from MockServer", 404);
}
/**
 * Recursion method to call GET api from the list of urls.
 */
async function getRequest(req, urls, index) {
  if (urls.length === index) return createURLsError();
  let url = urls[index] + req.originalUrl;

  try {
    let response = await axiosService({
      url,
      ...getRequestConfig(url, req, "get"),
    });
    if (isSuccess(response.status)) return response?.data ?? undefined;
    return await getRequest(req, urls, index + 1);
  } catch (e) {
    logApiFailure(
      url,
      e?.response?.status ?? 404,
      JSON.stringify(e ?? "No response is found!")
    );
    return await getRequest(req, urls, index + 1);
  }
}

// -- POST --
/**
 *  Handles the POST request and return the response.
 * @returns {Object}
 */
async function postRequestHelper(req, urls, path) {
  if (path) return await postRequest(req, getPathUrl(urls, path), 0);

  return await postRequest(req, urls, 0);
}

/**
 * Recursion method to call POST api from the list of urls.
 */
async function postRequest(req, urls, index) {
  if (urls.length === index) return createURLsError();
  let url = urls[index] + req.originalUrl;

  try {
    let response = await axiosService({
      url,
      ...getRequestConfig(url, req, "post"),
    });

    if (isSuccess(response.status)) return response?.data ?? undefined;
    else return await postRequest(req, urls, index + 1);
  } catch (e) {
    logApiFailure(
      url,
      e?.response?.status ?? 404,
      JSON.stringify(e ?? "No response is found!")
    );
    return await postRequest(req, urls, index + 1);
  }
}

// -- PATCH --
/**
 *  Handles the PATCH request and return the response.
 * @returns {Object}
 */
async function patchRequestHelper(req, urls, path) {
  if (path) return await patchRequest(req, getPathUrl(urls, path), 0);

  return await patchRequest(req, urls, 0);
}

/**
 * Recursion method to call PATCH api from the list of urls.
 */
async function patchRequest(req, urls, index) {
  if (urls.length === index) return createURLsError();
  let url = urls[index] + req.originalUrl;

  try {
    let response = await axiosService({
      url,
      ...getRequestConfig(url, req, "patch"),
    });
    if (isSuccess(response.status)) return response?.data ?? undefined;
    else return await patchRequest(req, urls, index + 1);
  } catch (e) {
    logApiFailure(
      url,
      e?.response?.status ?? 404,
      JSON.stringify(e ?? "No response is found!")
    );
    return await patchRequest(req, urls, index + 1);
  }
}
// -- Utils --
/**
 * Determine whether the response is success status code.
 * @param {Number} code
 */
function isSuccess(code) {
  return code >= 200 && code < 300;
}

/**
 * Return the list of urls
 * @returns {Promise<Array<String>>} List of Urls
 */
async function getUrls() {
  return (await getAllUrls()).map((data) => data.host);
}

/**
 * Return the list of paths
 * @returns {Array<String>} List of Urls
 */
async function getPaths() {
  return (await getAllPaths()).map((data) => data.path);
}

// Returns the list of urls that matches the path
function getPathUrl(urls, path) {
  return urls.filter((url) => {
    return url == path.host;
  });
}

// Pretty prints request errors to the log
function prettyLogError(error) {
  console.error("Request failed with: ", error.message, error.code);
  console.error("Failing URL is: ", error.config.url);
}

module.exports = {
  handleMockServer,
};
