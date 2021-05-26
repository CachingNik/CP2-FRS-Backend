const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.MongoDB({
      db: config.get("db"),
      options: { useUnifiedTopology: true },
    })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logfile.log" })
  );
};
