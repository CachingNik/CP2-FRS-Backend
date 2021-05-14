const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
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
      type: new mongoose.Schema({
        adult: { type: Number, required: true },
        child: { type: Number, required: true },
        infant: { type: Number, required: true },
      }),
      required: true,
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
    price: Joi.object().required().keys({
      adult: Joi.required(),
      child: Joi.required(),
      infant: Joi.required(),
    }),
    seatsLeft: Joi.number().min(0).required(),
  });

  return schema.validate(package);
}

exports.Package = Package;
exports.validate = validatePackage;
