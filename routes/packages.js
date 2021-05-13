const express = require("express");
const { Package, validate } = require("../models/package");
const { Airplane } = require("../models/airplane");
const { Airport } = require("../models/airport");

const router = express.Router();

router.get("/", async (req, res) => {
  const packages = await Package.find();

  res.send(packages);
});

router.get("/:fromId/:toId/:departure", async (req, res) => {
  const packages = await Package.find({
    "from._id": req.params.fromId,
    "to._id": req.params.toId,
    departure: { $gt: new Date(req.params.departure) },
  });

  res.send(packages);
});

router.get("/airplanes-name/:fromId/:toId/:departure", async (req, res) => {
  const packages = await Package.find({
    "from._id": req.params.fromId,
    "to._id": req.params.toId,
    departure: { $gt: new Date(req.params.departure) },
  }).distinct("airplane.name");

  res.send(packages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const airplane = await Airplane.findById(req.body.airplaneId);
  if (!airplane) return res.status(400).send("Invalid Airline.");

  const from = await Airport.findById(req.body.fromId);
  if (!from) return res.status(400).send("Invalid Airport.");

  const to = await Airport.findById(req.body.toId);
  if (!to) return res.status(400).send("Invalid Airport.");

  let package = new Package({
    airplane: airplane,
    from: from,
    to: to,
    departure: req.body.departure,
    arrival: req.body.arrival,
    price: req.body.price,
    capacity: req.body.capacity,
  });
  package = await package.save();

  res.send(package);
});

module.exports = router;
