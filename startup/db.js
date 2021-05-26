const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  mongoose
    .connect("mongodb://localhost/frs", mongodbOptions)
    .then(() => winston.info("Connected to MongoDB..."));
};
