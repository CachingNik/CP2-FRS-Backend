const mongoose = require("mongoose");
const Joi = require("joi");

const listofServiceClasses = ["Economy", "Business", "First"];

const serviceClassSchema = new mongoose.Schema({
  name: { type: String, enum: listofServiceClasses, required: true },
});

const ServiceClass = mongoose.model("ServiceClass", serviceClassSchema);

function validateServiceClass(serviceClass) {
  const schema = Joi.object({
    name: Joi.string()
      .valid(...listofServiceClasses)
      .required(),
  });

  return schema.validate(serviceClass);
}

exports.serviceClassSchema = serviceClassSchema;
exports.ServiceClass = ServiceClass;
exports.validate = validateServiceClass;
