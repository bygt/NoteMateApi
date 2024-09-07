const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    friends: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    friendRequests: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  },
  {
    tableName: "user",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
