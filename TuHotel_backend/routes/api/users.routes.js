import express from "express";
import { validateToken } from "../../helpers/authToken.js";
import User from "../../controllers/user.controller.js";

const router = express.Router();
const objUser = new User();

router.get("/", validateToken, objUser.getAllUsers);
router.get("/userinfo", validateToken, objUser.getUserByToken);
router.post("/admin", validateToken, objUser.isUserAdmin);

export default router;
