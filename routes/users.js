const auth = require("../middleware/auth"); // here auth means authorization
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate, validateUserOnUpdate } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/", [auth], async (req, res) => {
  const { error } = validateUserOnUpdate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  if (req.user.email !== req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already in use.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
      },
    },
    { new: true }
  );

  const updatedToken = updatedUser.generateAuthToken();

  res.send(updatedToken);
});

module.exports = router;
