const mongoose = require("mongoose");
const Joi = require("joi");

const airportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbrevation: { type: String, required: true, uppercase: true },
});

const Airport = mongoose.model("Airport", airportSchema);

function validateAirport(airport) {
  const schema = Joi.object({
    name: Joi.string().required(),
    abbrevation: Joi.string().max(3).required(),
  });

  return schema.validate(airport);
}

exports.airportSchema = airportSchema;
exports.Airport = Airport;
exports.validate = validateAirport;
