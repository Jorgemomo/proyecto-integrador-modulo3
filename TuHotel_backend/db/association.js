import User from "../models/User.model.js";
import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";
import Reservation from "../models/Reservation.model.js";

Hotel.hasMany(Room);
Room.belongsTo(Hotel);

User.belongsToMany(Room, {
  through: {
    model: Reservation,
    unique: false,
  },
});

Room.belongsToMany(User, {
  through: {
    model: Reservation,
    unique: false,
  },
});

export const createModels = async () => {
  await User.sync();
  await Hotel.sync();
  await Room.sync();
  await Reservation.sync();
}; // crea tabla sino existe

// createModels();
