const express = require("express");
const { ServiceClass, validate } = require("../models/serviceClass");

const router = express.Router();

router.get("/", async (req, res) => {
  const serviceClass = await ServiceClass.find();

  res.send(serviceClass);
});

router.get("/:id", async (req, res) => {
  const serviceClass = await ServiceClass.findById(req.params.id);

  if (!serviceClass) return res.status(404).send("Invalid Class.");

  res.send(serviceClass);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let serviceClass = new ServiceClass({
    name: req.body.name,
  });
  serviceClass = await serviceClass.save();

  res.send(serviceClass);
});

module.exports = router;
