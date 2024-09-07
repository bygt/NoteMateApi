const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Note = sequelize.define(
  "note",
  {
    note_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    from_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    to_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "note",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Note;
