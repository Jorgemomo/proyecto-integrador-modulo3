import express from "express";
import Room from "../../controllers/room.controller.js";

const router = express.Router();
const objRoom = new Room();

router.get("/", objRoom.getAllRooms);
router.get("/:id", objRoom.getRoomById);

export default router;
