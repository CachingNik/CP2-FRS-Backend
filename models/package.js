const mongoose = require("mongoose");
const Joi = require("joi");
const { airplaneSchema } = require("./airplane");
const { airportSchema } = require("./airport");

const priceSchema = new mongoose.Schema({
  economy: { type: Number, default: 0 },
  business: { type: Number, default: 0 },
  first: { type: Number, default: 0 },
});

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
        adult: { type: priceSchema, required: true },
        child: { type: priceSchema, required: true },
        infant: { type: priceSchema, required: true },
      }),
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 100,
      max: 1000,
    },
  })
);

function validatePackage(package) {
  const schema = Joi.object({
    airplaneId: Joi.string().required(),
    fromId: Joi.string().required(),
    toId: Joi.string().required(),
    departure: Joi.date().required(),
    arrival: Joi.date().greater(Joi.ref("departure")).required(),
    price: Joi.object().required().keys({
      adult: Joi.required(),
      child: Joi.required(),
      infant: Joi.required(),
    }),
    capacity: Joi.number().min(100).max(1000).required(),
  });

  return schema.validate(package);
}

exports.Package = Package;
exports.validate = validatePackage;
