const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

module.exports = User;
