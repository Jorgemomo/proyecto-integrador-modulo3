import HotelModel from "../models/Hotel.model.js";
import RoomModel from "../models/Room.model.js";

class Admin {
  async createHotel(req, res) {
    const { name } = req.hotel;

    try {
      const findHotelByName = await HotelModel.findOne({
        where: {
          name,
        },
      });

      if (findHotelByName) {
        return res.status(400).json({
          success: false,
          message: "Este Hotel ya existe",
        });
      }

      await HotelModel.create({ ...req.body });

      return res.status(201).json({
        success: true,
        message: "Se ha creado el hotel exitosamente",
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }

  async updateHotel(req, res) {
    const { id } = req.params;

    try {
      const findHotelById = await HotelModel.findOne({ where: { id } });

      if (!findHotelById) {
        return res.status(404).json({
          success: false,
          message: "El hotel no se puede actualizar, no existe",
        });
      }

      const updatedHotel = {
        ...findHotelById,
        ...req.body,
      };

      await Hotel.update(
        {
          ...updatedHotel,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: `Se actualizó el hotel ${id}`,
        data: {
          ...updatedHotel,
        },
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "ALgo va mal...",
      });
    }
  }

  async deleteHotel(req, res) {
    const { id } = req.params;

    try {
      const findHotelById = await HotelModel.findOne({ where: { id } });

      if (!findHotelById) {
        return res.status(404).json({
          success: false,
          message: "El hotel a actualizar no existe",
        });
      }

      await Hotel.update(
        {
          isActive: false,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: `Se eliminó hotel ${id}`,
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }

  async createRoom(req, res) {
    const { codeName, hotelId } = req.body;

    try {
      const findHotelById = await HotelModel.findOne({
        where: {
          id: hotelId,
        },
      });

      if (!findHotelById) {
        return res.status(400).json({
          success: false,
          message: "Hotel no existe, no es posible relacionar",
        });
      }

      const findRoomByCodeName = await RoomModel.findOne({
        where: {
          codeName,
        },
      });

      if (findRoomByCodeName) {
        return res.status(400).json({
          success: false,
          message: "Ya hay una habitación con ese nombre",
        });
      }

      await RoomModel.create({
        ...req.body,
        HotelId: hotelId,
      });

      return res.status(201).json({
        success: true,
        message: `Se creó habitacion para el hotel ${hotelId}`,
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }

  async updateRoom(req, res) {
    const { codeName } = req.params;

    try {
      const findRoomByCodeName = await RoomModel.findOne({
        where: {
          codeName,
        },
      });
      if (!findRoomByCodeName) {
        return res.status(404).json({
          success: false,
          message: "Está habitación no existe",
        });
      }

      const updatedRoom = {
        ...findRoomByCodeName,
        ...req.body,
      };

      await RoomModel.update(
        {
          ...updatedRoom,
        },
        {
          where: {
            codeName,
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: `Se actualizó la habitacion ${codeName}`,
        data: {
          ...updatedRoom,
        },
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }

  async deleteRoom(req, res) {
    const { codeName } = req.params;

    try {
      const findBoomByCodeName = await RoomModel.findOne({
        where: {
          codeName,
        },
      });
      if (!findBoomByCodeName) {
        return res.status(404).json({
          success: false,
          message: "La habitacion ya ha sido borrada",
        });
      }

      await RoomModel.destroy({
        where: {
          codeName,
        },
      });

      return res.status(200).json({
        success: true,
        message: `Se eliminó la habitacion ${codeName}`,
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Algo va mal...",
      });
    }
  }
}

export default Admin;
