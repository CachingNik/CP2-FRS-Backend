const mongoose = require("mongoose");
const Joi = require("joi");

const airplaneSchema = new mongoose.Schema({
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
});

const Airplane = mongoose.model("Airplane", airplaneSchema);

function validateAirplane(airplane) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(15).required(),
    number: Joi.string().required(),
  });

  return schema.validate(airplane);
}

exports.airplaneSchema = airplaneSchema;
exports.Airplane = Airplane;
exports.validate = validateAirplane;
