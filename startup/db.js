const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  const db = config.get("db");

  mongoose
    .connect(db, mongodbOptions)
    .then(() => winston.info(`Connected to ${db}...`));
};
