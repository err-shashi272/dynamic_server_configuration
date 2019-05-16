let HTTP_ERROR = {
  INTERNAL_SERVER_ERROR: "Internal server error, Please try again later",
  UNABLE_TO_CONNECT: "unable to connect server",
  NETWORK_ERROR: "Network Error",
  REQUEST_TIMEOUT_ERROR: "timeout",
  NOT_FOUND: "Requested resource not found",
  BAD_REQUEST: "Bad Request",
  INVALID_IP_ADDRESS: "Invalid IP address",
  INVALID_REQUEST_FIELDS:
    "Invalid request fields, make sure you have these fields - env, key, user, value, action"
};
let HTTP_CODE = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};
let HTTP_SUCCESS = "ENV variables updated successfully";
let STREAM_TIMEOUT = 5000;
let STREAM_ERROR = "unabel to find config stream, Please try again later";
let SHELL_SCRIPT_NOT_FOUND =
  "Unable to find shell script,Please try again later";
let IP_FIELD = "ip";
module.exports = {
  HTTP_ERROR,
  HTTP_SUCCESS,
  HTTP_CODE,
  STREAM_TIMEOUT,
  STREAM_ERROR,
  SHELL_SCRIPT_NOT_FOUND,
  IP_FIELD
};
