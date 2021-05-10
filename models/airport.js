const mongoose = require("mongoose");
const Joi = require("joi");

const Airport = mongoose.model(
  "Airport",
  new mongoose.Schema({
    name: { type: String, required: true },
    abbrevation: { type: String, required: true, uppercase: true },
  })
);

function validateAirport(airport) {
  const schema = Joi.object({
    name: Joi.string().required(),
    abbrevation: Joi.string().max(3).required(),
  });

  return schema.validate(airport);
}

exports.Airport = Airport;
exports.validate = validateAirport;
