import RoomModel from "../models/Room.model.js";

class Room {
  async getAllRooms(req, res) {
    const rooms = await RoomModel.findAll({
      where: {
        isActive: true,
      },
      order: [["name", "ASC"]], // A-Z
    });

    return res.status(200).json({
      success: true,
      length: rooms?.length,
      data: rooms ?? [],
    });
  }

  async getRoomById(req, res) {
    const { id } = req.params;

    try {
      const room = await RoomModel.findOne({
        where: {
          id,
        },
      });

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "Habitación no fue encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        data: room,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }
}

export default Room;
