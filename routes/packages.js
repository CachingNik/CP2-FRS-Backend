const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Package, validate } = require("../models/package");
const { Airplane } = require("../models/airplane");
const { Airport } = require("../models/airport");
const { ServiceClass } = require("../models/serviceClass");

const router = express.Router();

router.get("/", async (req, res) => {
  const packages = await Package.find();

  res.send(packages);
});

router.get("/:id", async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) return res.status(404).send("Flight not found.");

  res.send(package);
});

router.get("/:fromId/:toId/:serviceClassId/:departure", async (req, res) => {
  const packages = await Package.find({
    "from._id": req.params.fromId,
    "to._id": req.params.toId,
    "serviceClass._id": req.params.serviceClassId,
    departure: { $gt: new Date(req.params.departure) },
  });

  if (!packages) return res.status(404).send("Flight not found.");

  res.send(packages);
});

router.get(
  "/airplanes-name/:fromId/:toId/:serviceClassId/:departure",
  async (req, res) => {
    const airplanes = await Package.find({
      "from._id": req.params.fromId,
      "to._id": req.params.toId,
      "serviceClass._id": req.params.serviceClassId,
      departure: { $gt: new Date(req.params.departure) },
    }).distinct("airplane.name");

    if (!airplanes) return res.status(404).send("No Airlines assigned here.");

    res.send(airplanes);
  }
);

router.post("/", [auth, admin], async (req, res) => {
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

  const serviceClass = await ServiceClass.findById(req.body.serviceClassId);
  if (!to) return res.status(400).send("Invalid Class.");

  const package = new Package({
    airplane: airplane,
    from: from,
    to: to,
    serviceClass: serviceClass,
    departure: req.body.departure,
    arrival: req.body.arrival,
    price: req.body.price,
    seatsLeft: req.body.seatsLeft,
  });

  await package.save();

  res.send(package);
});

router.put("/:id", [auth, admin], async (req, res) => {
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

  const serviceClass = await ServiceClass.findById(req.body.serviceClassId);
  if (!to) return res.status(400).send("Invalid Class.");

  const package = await Package.findByIdAndUpdate(
    req.params.id,
    {
      airplane: airplane,
      from: from,
      to: to,
      serviceClass: serviceClass,
      departure: req.body.departure,
      arrival: req.body.arrival,
      price: req.body.price,
      seatsLeft: req.body.seatsLeft,
    },
    { new: true }
  );

  if (!package) return res.status(404).send("Flight not found.");

  res.send(package);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const package = await Package.findByIdAndRemove(req.params.id);

  if (!package) return res.status(404).send("Flight not found.");

  res.send(package);
});

module.exports = router;
