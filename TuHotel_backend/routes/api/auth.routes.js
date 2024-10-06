import express from "express";
import Auth from "../../controllers/auth.controller.js";

const router = express.Router();
const objAuth = new Auth();

router.post("/login", objAuth.login);
router.post("/register", objAuth.register);

export default router;
