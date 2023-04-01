import { DataTypes } from "sequelize";
import sequelize from "../config/config";
export const File = sequelize.define("file", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
