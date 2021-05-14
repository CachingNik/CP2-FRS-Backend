const mongoose = require("mongoose");
const Joi = require("joi");

const ListofServiceClasses = ["Economy", "Business", "First"];

const serviceClassSchema = new mongoose.Schema({
  name: { type: String, enum: ListofServiceClasses, required: true },
});

const ServiceClass = mongoose.model("SericeClass", serviceClassSchema);

function validateServiceClass(serviceClass) {
  const schema = Joi.object({
    name: Joi.string()
      .valid(...ListofServiceClasses)
      .required(),
  });

  return schema.validate(serviceClass);
}

exports.serviceClassSchema = serviceClassSchema;
exports.ServiceClass = ServiceClass;
exports.validate = validateServiceClass;
