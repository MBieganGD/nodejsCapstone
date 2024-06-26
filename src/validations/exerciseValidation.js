const Joi = require("joi");

const createExerciseSchema = Joi.object({
  ":_id": Joi.allow(),
  description: Joi.string().min(3).required(),
  duration: Joi.number().integer().min(1).required(),
  date: Joi.alternatives().try(
    Joi.date().optional(),
    Joi.string()
      .allow("")
      .optional()
      .custom((value, helpers) => {
        return value === "" ? undefined : value;
      })
  ),
});

module.exports = { createExerciseSchema };
