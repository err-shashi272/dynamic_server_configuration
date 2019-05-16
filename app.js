/**
 * App entry point
 */

const http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  httpConstants = require("./constants/http");

//create global app object

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
global.__basedir = __dirname;
app.use(require("./routes"));
require("dotenv").config();
app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error(httpConstants.HTTP_ERROR.NOT_FOUND);
  err.status = httpConstants.HTTP_CODE.NOT_FOUND;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR);
  res.json({
    status: false,
    errors: {
      message: err.message,
      error: {}
    }
  });
});

var server = app.listen(
  process.env.APPLICATION_PORT || process.env.PORT,
  function () {
    console.log("Listening on port " + server.address().port);
  }
);
