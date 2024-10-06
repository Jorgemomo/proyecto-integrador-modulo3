import express from "express";
import { validateToken } from "../../helpers/authToken.js";
import Search from "../../controllers/search.controller.js";

const router = express.Router();
const objSearch = new Search();

router.get("/", validateToken, objSearch.searchAll);

export default router;
