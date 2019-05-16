var router = require("express").Router();

router.use("/", require("./env"));

router.use(function(err, req, res, next) {
  if (err) {
    return next(err);
  }
});

module.exports = router;
