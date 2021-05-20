const mongoose = require("mongoose");
const Joi = require("joi");
const { airplaneSchema } = require("./airplane");
const { airportSchema } = require("./airport");
const { serviceClassSchema } = require("./serviceClass");

const Package = mongoose.model(
  "Package",
  new mongoose.Schema({
    airplane: {
      type: airplaneSchema,
      required: true,
    },
    from: {
      type: airportSchema,
      required: true,
    },
    to: {
      type: airportSchema,
      required: true,
    },
    serviceClass: {
      type: serviceClassSchema,
      required: true,
    },
    departure: {
      type: Date,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    price: {
      adult: { type: Number, required: true },
      child: { type: Number, required: true },
      infant: { type: Number, required: true },
    },
    seatsLeft: {
      type: Number,
      required: true,
      min: 0,
    },
  })
);

function validatePackage(package) {
  const schema = Joi.object({
    airplaneId: Joi.objectId().required(),
    fromId: Joi.objectId().required(),
    toId: Joi.objectId().required(),
    serviceClassId: Joi.objectId().required(),
    departure: Joi.date().required(),
    arrival: Joi.date().greater(Joi.ref("departure")).required(),
    price: {
      adult: Joi.number().min(0).required(),
      child: Joi.number().min(0).required(),
      infant: Joi.number().min(0).required(),
    },
    seatsLeft: Joi.number().min(0).required(),
  });

  return schema.validate(package);
}

exports.Package = Package;
exports.validate = validatePackage;
