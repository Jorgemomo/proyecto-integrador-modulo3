import sequelize from "../db/connection.js";
import { DataTypes, Model } from "sequelize";

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "cancel"), // ACTIVO, INACTIVO O CANCELADO.
      allowNull: false,
      defaultValue: "active",
    },
    nightsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    // opciones
    sequelize, // necesario para conectar instancia
    modelName: "Reservation", // para darle el nombre al modelo en bd
    timestamps: true,
  }
);

export default Reservation;
