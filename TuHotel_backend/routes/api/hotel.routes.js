import express from "express";
import Hotel from "../../controllers/hotel.controller.js";

const router = express.Router();
const objHotel = new Hotel();

router.get("/", objHotel.getAllHotels);
router.get("/:id", objHotel.getHotelById);

export default router;
