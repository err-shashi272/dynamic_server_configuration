module.exports = {
  groupIp: function(jsonObject, field) {
    let groupObj = jsonObject.reduce(function(r, a) {
      r[a[field]] = r[a[field]] || [];
      r[a[field]].push(a);
      return r;
    }, Object.create(null));
    return groupObj;
  },

  validateIp: function(ipAddress) {
    return require("net").isIPv4(ipAddress);
  },

  validateBodyParser: function(reqObj) {
    if (reqObj) {
      if (
        reqObj.env &&
        reqObj.key &&
        reqObj.value &&
        reqObj.user &&
        reqObj.action
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};
