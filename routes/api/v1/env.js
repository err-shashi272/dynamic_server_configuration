const router = require("express").Router();
const auth = require("../../auth");
const execPath = require("../../../controllers/execPath");
const logger = require("../../../logger").LOG;
/**
 * SET ENV Variables to server
 */
router.post("/exec/path", auth.isAuthorized, function(req, res, next) {
  //log the input request
  logger.debug(
    "request received for updating env at " +
      new Date() +
      " with the request body " +
      JSON.stringify(req.body) +
      " and headers " +
      JSON.stringify(req.headers)
  );
  execPath
    .execPath(req.body.fields)
    .then(function(response) {
      if (response && response.success === true) {
        logger.debug(
          "response for request body " +
            JSON.stringify(req.body) +
            "at " +
            new Date() +
            " is " +
            response
        );
        res
          .status(200)
          .json({ status: true, message: response.message, errors: {} });
      } else {
        logger.debug(
          "error response for request body " +
            JSON.stringify(req.body) +
            "at " +
            new Date() +
            " is " +
            response
        );
        next(response);
      }
    })
    .catch(function(err) {
      logger.error(
        "error occured for request " +
          JSON.stringify(req.body) +
          "at " +
          new Date() +
          " is " +
          err
      );
      next(err);
    });
});

module.exports = router;
