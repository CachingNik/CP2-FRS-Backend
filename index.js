const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const cors = require("cors");
const airports = require("./routes/airports");
const airplanes = require("./routes/airplanes");
const packages = require("./routes/packages");
const serviceClasses = require("./routes/serviceClasses");

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect("mongodb://localhost/frs", mongodbOptions)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Connection error to MongoDB..."));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/airports", airports);
app.use("/api/airplanes", airplanes);
app.use("/api/packages", packages);
app.use("/api/serviceClasses", serviceClasses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
