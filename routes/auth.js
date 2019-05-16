const logger = require("../logger").LOG;
//check if token is validated

module.exports.isAuthorized = function(req, res, next) {
  //check for headers
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.appname &&
    req.headers.service
  ) {
    return next();
  } else {
    logger.error(
      "Bad request received for request " + req.body + " at " + new Date()
    );
    let err = new Error("Bad Request");
    err.status = 400;
    return next(err);
  }
};
