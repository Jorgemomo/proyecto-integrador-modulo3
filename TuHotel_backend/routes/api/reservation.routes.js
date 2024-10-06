import express from "express";
import Reservation from "../../controllers/reservation.controller.js";

const router = express.Router();
const objReservation = new Reservation();

router.get("/", objReservation.getReservationsByUser);
router.post("/", objReservation.createResevation);
router.delete("/:id", objReservation.cancelReservation);

export default router;
