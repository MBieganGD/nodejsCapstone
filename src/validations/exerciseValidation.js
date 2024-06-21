const Joi = require("joi");

const createExerciseSchema = Joi.object({
  ":_id": Joi.allow(),
  description: Joi.string().min(3).required(),
  duration: Joi.number().integer().min(1).required(),
  date: Joi.date().optional(),
});

module.exports = { createExerciseSchema };
