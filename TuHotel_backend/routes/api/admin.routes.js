import express from "express";
import Admin from "../../controllers/admin.controller.js";

const router = express.Router();
const objAdmin = new Admin();

router.post("/hotels", objAdmin.createHotel);
router.put("/hotels/:id", objAdmin.updateHotel);
router.delete("/hotels/:id", objAdmin.deleteHotel);
router.post("/rooms", objAdmin.createRoom);
router.put("/rooms/:codeName", objAdmin.updateRoom);
router.delete("/rooms/:codeName", objAdmin.deleteRoom);

export default router;
