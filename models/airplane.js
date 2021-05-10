const mongoose = require("mongoose");
const Joi = require("joi");

const Airplane = mongoose.model(
  "Airplane",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
    },
    number: {
      type: String,
      required: true,
    },
  })
);

function validateAirplane(airplane) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(15).required(),
    number: Joi.string().required(),
  });

  return schema.validate(airplane);
}

exports.Airplane = Airplane;
exports.validate = validateAirplane;
