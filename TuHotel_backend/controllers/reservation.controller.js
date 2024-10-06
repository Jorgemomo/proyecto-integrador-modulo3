import UserModel from "../models/User.model.js";
import ReservationModel from "../models/Reservation.model.js";
import RoomModel from "../models/Room.model.js";

class Reservation {
  async createResevation(req, res) {
    const { startDate, endDate, nightsQuantity, roomId } = req.body;

    const userEmail = req.userEmail;

    try {
      const { id } = await UserModel.findOne({
        attributes: ["id"],
        where: {
          email: userEmail,
        },
      });

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Usuario no existe",
        });
      }

      if (nightsQuantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "La reserva no puede menor a una noche",
        });
      }

      const room = await RoomModel.findOne({
        where: {
          id: roomId,
        },
      });

      // TODO: validar el rango de fechas, en caso de que la
      // reserva ya este hecha en ese rango, no se puede realizar.

      await ReservationModel.create({
        startDate,
        endDate,
        nightsQuantity,
        total: room?.pricePerNight * nightsQuantity,
        UserId: id,
        RoomId: roomId,
      });

      return res.status(201).json({
        success: true,
        message: "Reserva realizada",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Algo va mal: ${err.message}`,
      });
    }
  }

  async cancelReservation(req, res) {
    const { id } = req?.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "el identificador es requerido",
      });
    }

    try {
      const now = new Date();

      const reservation = await ReservationModel.findOne({
        where: {
          id,
        },
      });

      if (!reservation) {
        return res.status(400).json({
          success: false,
          message: "La reserva no existe",
        });
      }

      const reservationStartDate = new Date(reservation?.startDate);

      // Estan tratando de cancelar la reserva el mismo dia
      if (
        now.getDate() === reservationStartDate.getDate() ||
        now.getTime() > reservationStartDate.getTime()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "No es posible cancelar la reserva el mismo día, que inicia la reservación",
        });
      }

      await ReservationModel.update(
        {
          status: "cancel",
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: "La reserva fue cancelada",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Algo va mal: ${err.message}`,
      });
    }
  }

  async getReservationsByUser(req, res) {
    const userEmail = req?.userEmail;

    try {
      const user = await UserModel.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "El usuario no existe",
        });
      }

      const reservationsByUser = await ReservationModel.findAll({
        where: {
          UserId: user?.id,
        },
      });

      if (!reservationsByUser) {
        return res.status(404).json({
          success: false,
          message: "No hay reservas",
        });
      }

      return res.status(200).json({
        success: true,
        data: reservationsByUser,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Algo va mal ${err.message}`,
      });
    }
  }
}

export default Reservation;
