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

  const airport = new Airport({
    name: req.body.name,
    abbrevation: req.body.abbrevation,
  });

  await airport.save();

  res.send(airport);
});

module.exports = router;
