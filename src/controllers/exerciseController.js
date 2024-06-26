const { Op } = require("sequelize");
const { createExerciseSchema } = require("../validations/exerciseValidation");
const Exercise = require("../models/Exercise");
const User = require("../models/User");
const { DateTime } = require("luxon");

async function createExercise(req, res) {
  try {
    const { error, value } = createExerciseSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const { _id } = req.params;
    const user = await User.findByPk(_id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const exercise = await Exercise.create({
      ...value,
      userId: user._id,
      date: value.date ? value.date : DateTime.now().toISODate(),
    });

    res.status(201).json({
      userId: user._id,
      exerciseId: exercise.id,
      duration: exercise.duration,
      description: exercise.description,
      date: DateTime.fromISO(exercise.date).toFormat("yyyy-MM-dd"),
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the exercise" });
  }
}

async function getLogs(req, res) {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findByPk(_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const where = { userId: _id };

    if (from || to) {
      where.date = {};
      if (from) {
        where.date[Op.gte] = DateTime.fromISO(from).startOf("day").toJSDate();
      }
      if (to) {
        where.date[Op.lte] = DateTime.fromISO(to).endOf("day").toJSDate();
      }
    }

    const allExercises = await Exercise.findAll({
      where,
      order: [["date", "ASC"]],
      attributes: ["id", "description", "duration", "date"],
    });

    const totalExercisesCount = allExercises.length;

    const limitedExercises = limit
      ? allExercises.slice(0, parseInt(limit))
      : allExercises;

    res.json({
      username: user.username,
      count: totalExercisesCount,
      log: limitedExercises.map((e) => ({
        id: e.id,
        description: e.description,
        duration: e.duration,
        date: DateTime.fromISO(e.date).toFormat("yyyy-MM-dd"),
      })),
    });
  } catch (err) {
    console.error("Error in getLogs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { createExercise, getLogs };
