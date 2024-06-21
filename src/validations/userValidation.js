const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
});

module.exports = { createUserSchema };
