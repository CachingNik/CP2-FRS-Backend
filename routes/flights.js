const express = require("express");

const router = express.Router();

const flights = [
  {
    _id: 1,
    airline: { name: "Indigo", id: "SG 589" },
    time: { departure: "13:00", arrival: "17:00" },
    location: { from: "DEL", to: "BLR" },
    price: 5899,
  },
  {
    _id: 2,
    airline: { name: "Air India", id: "FG 589" },
    time: { departure: "8:00", arrival: "12:00" },
    location: { from: "DEL", to: "BLR" },
    price: 6099,
  },
  {
    _id: 3,
    airline: { name: "Indigo", id: "SG 289" },
    time: { departure: "9:00", arrival: "13:00" },
    location: { from: "DEL", to: "BLR" },
    price: 5899,
  },
  {
    _id: 4,
    airline: { name: "Air Asia", id: "EY 589" },
    time: { departure: "14:00", arrival: "17:30" },
    location: { from: "DEL", to: "BLR" },
    price: 6599,
  },
];

router.get("/", (req, res) => {
  res.send(flights);
});

router.get("/:id", (req, res) => {
  const flight = flights.find((f) => f._id === parseInt(req.params.id));

  if (!flight) return res.status(404).send("Flight not found.");
  res.send(flight);
});

module.exports = router;
