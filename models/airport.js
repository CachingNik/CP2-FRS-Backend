const mongoose = require("mongoose");
const Joi = require("joi");

const airportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true, uppercase: true },
});

const Airport = mongoose.model("Airport", airportSchema);

function validateAirport(airport) {
  const schema = Joi.object({
    name: Joi.string().required(),
    abbreviation: Joi.string().max(3).required(),
  });

  return schema.validate(airport);
}

exports.airportSchema = airportSchema;
exports.Airport = Airport;
exports.validate = validateAirport;
