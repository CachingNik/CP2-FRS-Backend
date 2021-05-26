const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error({ message: err.message, stack: err.stack, metadata: err });

  res.status(500).send("Something failed.");
};
