const mongoose = require("mongoose");

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
});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
