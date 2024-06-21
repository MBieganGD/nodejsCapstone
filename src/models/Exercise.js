const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const User = require("./User");

const Exercise = sequelize.define("Exercise", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

Exercise.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Exercise, { foreignKey: "userId" });

module.exports = Exercise;
