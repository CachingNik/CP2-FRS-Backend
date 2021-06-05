const mongoose = require("mongoose");
const Joi = require("joi");
const moment = require("moment");

const genders = ["male", "female"];

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: Number, length: 10, required: true },
  adultList: {
    type: [
      {
        gender: { type: String, enum: genders, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    ],
    required: true,
  },
  childList: {
    type: [
      {
        gender: { type: String, enum: genders, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
      },
    ],
    required: true,
  },
  amount: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    flightId: Joi.objectId().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required(),
    adultList: Joi.array().items({
      gender: Joi.string().valid("male", "female").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
    childList: Joi.array().items({
      gender: Joi.string().valid("male", "female").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dateOfBirth: Joi.date()
        .min(moment().subtract(11, "years").format("YYYY-MM-DD"))
        .required()
        .messages({
          "date.min": "Age of child must be less than or equal to 11.",
        }),
    }),
    amount: Joi.number().required(),
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
