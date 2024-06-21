const { createUserSchema } = require("../validations/userValidation");
const User = require("../models/User");

async function createUser(req, res) {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({
      where: { username: value.username },
    });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const user = await User.create(value);
    res.status(201).json({ username: user.username, _id: user._id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll({ attributes: ["_id", "username"] });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
}

module.exports = { createUser, getUsers };
