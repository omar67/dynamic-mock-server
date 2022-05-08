// The application name!
exports.title = "Dynamic Mock server";

// The API list of urls to call one by one, in order. When failing, the next url will be called.
exports.urls = [
  "https://jsonplaceholder.typicode.co123/todos",
  "https://jsonplaceholder.typicode.co123/todos",
  "https://jsonplaceholder.typicode.com",
  "http://10.14.193.77:9010",
];
