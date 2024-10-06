import HotelModel from "../models/Hotel.model.js";
import RoomModel from "../models/Room.model.js";

class Hotel {
  async getAllHotels(req, res) {
    const hotels = await HotelModel.findAll({
      where: {
        isActive: true,
      },
      order: [["name", "ASC"]], // A-Z
    });

    return res.status(200).json({
      success: true,
      length: hotels?.length,
      data: hotels ?? [],
    });
  }

  async getHotelById(req, res) {
    const { id } = req.params;

    try {
      const hotel = await HotelModel.findOne({
        where: {
          id,
        },
        include: {
          model: RoomModel,
          // right: true,
        },
      });

      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel no fue encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        data: hotel,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }
}

export default Hotel;
