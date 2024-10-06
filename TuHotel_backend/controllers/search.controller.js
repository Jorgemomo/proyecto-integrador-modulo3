import { Op } from "sequelize";

import HotelModel from "../models/Hotel.model.js";
import RoomModel from "../models/Room.model.js";
import UserModel from "../models/User.model.js";

class Search {
  async searchAll(req, res) {
    const { value } = req.query;

    const searchValue = value.toLowerCase().trim();

    try {
      const hotelsBySearch = await HotelModel.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${searchValue}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${searchValue}%`,
              },
            },
            {
              city: {
                [Op.like]: `%${searchValue}%`,
              },
            },
            {
              country: {
                [Op.like]: `%${searchValue}%`,
              },
            },
          ],
        },
      });

      const roomsBySearch = await RoomModel.findAll({
        where: {
          [Op.or]: [
            {
              codeName: {
                [Op.like]: `%${searchValue}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${searchValue}%`,
              },
            },
          ],
        },
      });

      const usersBySearch = await UserModel.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${searchValue}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${searchValue}%`,
              },
            },
          ],
        },
      });

      return res.status(200).json({
        success: true,
        length: (roomsBySearch?.length ?? 0) + (hotelsBySearch?.length ?? 0),
        data: {
          rooms: roomsBySearch,
          hotels: hotelsBySearch,
          users: usersBySearch,
        },
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "ALgo va mal...",
      });
    }
  }
}

export default Search;
