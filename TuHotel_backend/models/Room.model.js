import sequelize from "../db/connection.js";
import { DataTypes, Model } from "sequelize";

class Room extends Model {}

Room.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    photos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codeName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // opciones
    sequelize, // necesario para conectar instancia
    modelName: "Room", // para darle el nombre al modelo en bd
    timestamps: true,
  }
);

export default Room;
