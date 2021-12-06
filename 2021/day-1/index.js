const fetch = require("fetch").fetchUrl;

fetch("./input.txt", handleFetchResponse);

function handleFetchResponse(response) {
  console.log(response);
}