const express = require("express");
const { Airport, validate } = require("../models/airport");

const router = express.Router();

router.get("/", async (req, res) => {
  const airports = await Airport.find();

  res.send(airports);
});

router.get("/:id", async (req, res) => {
  const airport = await Airport.findById(req.params.id);

  if (!airport) return res.status(404).send("No such Airport exists!");

  res.send(airport);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let airport = new Airport({
    name: req.body.name,
    abbrevation: req.body.abbrevation,
  });
  airport = await airport.save();

  res.send(airport);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const airport = await Airport.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, abbrevation: req.body.abbrevation },
    { new: true }
  );

  if (!airport) return res.status(404).send("No such Airport exists!");

  res.send(airport);
});

router.delete("/:id", async (req, res) => {
  const airport = await Airport.findByIdAndRemove(req.params.id);

  if (!airport) return res.status(404).send("No such Airport exists!");

  res.send(airport);
});

module.exports = router;
