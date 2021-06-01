const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }

  if (!config.get("razorpayId")) {
    throw new Error("FATAL ERROR: razorpayId is not defined.");
  }

  if (!config.get("razorpaySecret")) {
    throw new Error("FATAL ERROR: razorpaySecret is not defined.");
  }
};
