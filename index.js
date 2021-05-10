const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const airports = require("./routes/airports");
const airplanes = require("./routes/airplanes");

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
