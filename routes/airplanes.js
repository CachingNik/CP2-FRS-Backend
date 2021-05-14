const express = require("express");
const { Airplane, validate } = require("../models/airplane");

const router = express.Router();

router.get("/", async (req, res) => {
  const airplanes = await Airplane.find().sort("name");

  res.send(airplanes);
});

router.get("/:id", async (req, res) => {
  const airplane = await Airplane.findById(req.params.id);

  if (!airplane) return res.status(404).send("No such Airline exists.");

  res.send(airplane);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let airplane = new Airplane({
    name: req.body.name,
    number: req.body.number,
  });
  airplane = await airplane.save();

  res.send(airplane);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const airplane = await Airplane.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, number: req.body.number },
    { new: true }
  );

  if (!airplane) return res.status(404).send("No such Airline exists.");

  res.send(airplane);
});

router.delete("/:id", async (req, res) => {
  const airplane = await Airplane.findByIdAndRemove(req.params.id);

  if (!airplane) return res.status(404).send("No such Airline exists.");

  res.send(airplane);
});

module.exports = router;
