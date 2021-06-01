const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const Razorpay = require("razorpay");
const shortId = require("shortid");
const crypto = require("crypto");
const config = require("config");
const auth = require("../middleware/auth");
const { Order } = require("../models/order");

const router = express.Router();

Fawn.init(mongoose);

router.post("/new", [auth], async (req, res) => {
  const razorpay = new Razorpay({
    key_id: config.get("razorpayId"),
    key_secret: config.get("razorpaySecret"),
  });

  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: shortId.generate(),
  };

  const order = await razorpay.orders.create(options);

  res.send(order);
});

router.post("/verification", [auth], async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    flightId,
    name,
    email,
    mobileNumber,
    adultList,
    childList,
  } = req.body;

  const shasum = crypto.createHmac("sha256", config.get("razorpaySecret"));
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");
  if (digest !== razorpay_signature)
    return res.status(400).send("Transaction not legit.");

  const order = new Order({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    flightId: flightId,
    name: name,
    email: email,
    mobileNumber: mobileNumber,
    adultList: adultList,
    childList: childList,
  });

  const passengerCount = adultList.length + childList.length;

  new Fawn.Task()
    .save("orders", order)
    .update(
      "packages",
      { _id: mongoose.Types.ObjectId(flightId) },
      { $inc: { seatsLeft: -passengerCount } }
    )
    .run();

  res.send(order);
});

module.exports = router;
