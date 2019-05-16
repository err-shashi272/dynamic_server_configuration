const httpConstants = require("../constants/http");
module.exports = {
  handleBashResponse: function(stdout, stderr, code, count, ipGroup, i) {
    if (code && code === 1) {
      let err = new Error(httpConstants.HTTP_ERROR.UNABLE_TO_CONNECT);
      err.status = httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR;
      err.success = false;
      return err;
    } else if (stderr) {
      let err = new Error(
        httpConstants.HTTP_ERROR.UNABLE_TO_CONNECT +
          " IP " +
          i +
          " and user " +
          ipGroup[i][0]["user"]
      );
      err.status = httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR;
      err.success = false;
      return err;
    } else if (stdout && code == 0) {
      sshSuccessResponse = {
        success: true,
        message: httpConstants.HTTP_SUCCESS
      };
      if (count === Object.keys(ipGroup).length) {
        return sshSuccessResponse;
      }
    } else {
      let err = new Error(httpConstants.HTTP_ERROR.INTERNAL_SERVER_ERROR);
      err.status = httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR;
      err.success = false;
      return err;
    }
  }
};
