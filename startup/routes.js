const express = require("express");
const cors = require("cors");
const airports = require("../routes/airports");
const airplanes = require("../routes/airplanes");
const packages = require("../routes/packages");
const serviceClasses = require("../routes/serviceClasses");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/airports", airports);
  app.use("/api/airplanes", airplanes);
  app.use("/api/packages", packages);
  app.use("/api/serviceClasses", serviceClasses);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
