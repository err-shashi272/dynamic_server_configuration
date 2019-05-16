const fs = require("fs");
const validationUtil = require("../utils/validation");
const shell = require("shelljs");
const httpConstants = require("../constants/http");
const bash = require("../utils/handleBash");

module.exports = {
  execPath: function(fields) {
    return new Promise(function(resolve, reject) {
      try {
        let ipGroup = validationUtil.groupIp(fields, httpConstants.IP_FIELD);
        let count = 0;
        if (ipGroup && Object.keys(ipGroup).length > 0) {
          for (let i in ipGroup) {
            if (!validationUtil.validateIp(i)) {
              let err = new Error(
                httpConstants.HTTP_ERROR.INVALID_IP_ADDRESS + " " + i
              );
              err.status = httpConstants.HTTP_CODE.BAD_REQUEST;
              err.success = false;
              reject(err);
              return;
            }
            count++;
            fs.writeFileSync(
              __basedir +
                "/" +
                process.env.ASSET_PATH +
                "/" +
                process.env.CONFIG_FILE,
              "",
              err => {
                if (err) {
                  let err = new Error(httpConstants.STREAM_ERROR);
                  err.status = httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR;
                  err.success = false;
                  reject(err);
                }
              }
            );
            for (let j = 0; j < ipGroup[i].length; j++) {
              if (!validationUtil.validateBodyParser(ipGroup[i][j])) {
                let err = new Error(
                  httpConstants.HTTP_ERROR.INVALID_REQUEST_FIELDS
                );
                err.status = httpConstants.HTTP_CODE.BAD_REQUEST;
                err.success = false;
                reject(err);
                return;
              }
              fs.appendFileSync(
                __basedir +
                  "/" +
                  process.env.ASSET_PATH +
                  "/" +
                  process.env.CONFIG_FILE,
                ipGroup[i][j]["action"] +
                  "=" +
                  ipGroup[i][j]["key"] +
                  "=" +
                  ipGroup[i][j]["value"] +
                  "\n",
                err => {
                  // throws an error, you could also catch it here
                  if (err) throw err;
                }
              );
            }

            //check if shell script exists
            if (
              fs.existsSync(
                __basedir +
                  "/" +
                  process.env.ASSET_PATH +
                  "/" +
                  process.env.SHELL_SCRIPT
              ) &&
              fs.existsSync(
                __basedir +
                  "/" +
                  process.env.ASSET_PATH +
                  "/" +
                  process.env.CONFIG_FILE
              )
            ) {
              let { stdout, stderr, code } = shell.exec(
                "bash " +
                  __basedir +
                  "/" +
                  process.env.ASSET_PATH +
                  "/" +
                  process.env.SHELL_SCRIPT +
                  " " +
                  ipGroup[i][0]["user"] +
                  " " +
                  i,
                {
                  silent: true,
                  timeout: httpConstants.STREAM_TIMEOUT
                }
              );
              //once shell execute delete the config file
              fs.unlinkSync(
                __basedir +
                  "/" +
                  process.env.ASSET_PATH +
                  "/" +
                  process.env.CONFIG_FILE
              );
              let updateBashResponse = bash.handleBashResponse(
                stdout,
                stderr,
                code,
                count,
                ipGroup,
                i
              );
              if (updateBashResponse && updateBashResponse.success) {
                let { stdout, stderr, code } = shell.exec(
                  "bash " +
                    __basedir +
                    "/" +
                    process.env.ASSET_PATH +
                    "/" +
                    process.env.RELOAD_SCRIPT +
                    " " +
                    ipGroup[i][0]["user"] +
                    " " +
                    i,
                  {
                    silent: true,
                    timeout: httpConstants.STREAM_TIMEOUT
                  }
                );

                let reloadBashResponse = bash.handleBashResponse(
                  stdout,
                  stderr,
                  code,
                  count,
                  ipGroup,
                  i
                );
                if (reloadBashResponse && reloadBashResponse.success) {
                  resolve(reloadBashResponse);
                } else {
                  reject(reloadBashResponse);
                }
              } else {
                reject(updateBashResponse);
              }
            } else {
              let err = new Error(httpConstants.STREAM_ERROR);
              err.status = httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR;
              err.success = false;
              reject(err);
            }
          }
        } else {
          let err = new Error(httpConstants.HTTP_ERROR.BAD_REQUEST);
          err.status = httpConstants.HTTP_CODE.BAD_REQUEST;
          err.success = false;
          reject(err);
        }
      } catch (error) {
        let err = new Error(httpConstants.HTTP_ERROR.INTERNAL_SERVER_ERROR);
        err.status = httpConstants.HTTP_CODE.INTERNAL_SERVER_ERROR;
        err.success = false;
        reject(err);
      }
    });
  }
};
