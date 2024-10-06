import express from "express";

import { validateToken } from "../helpers/authToken.js";
import homeApi from "./api/index.js";
import usersApi from "./api/users.routes.js";
import authApi from "./api/auth.routes.js";
import adminApi from "./api/admin.routes.js";
import searchApi from "./api/search.routes.js";
import hotelApi from "./api/hotel.routes.js";
import roomApi from "./api/room.routes.js";
import reservationApi from "./api/reservation.routes.js";

const routers = (app) => {
  const baseRoute = express.Router();

  app.use(express.static("public"));
  app.use("/api/v1", baseRoute);

  baseRoute.use(homeApi);
  baseRoute.use("/users", validateToken, usersApi);
  baseRoute.use("/auth", authApi);
  baseRoute.use("/admin", validateToken, adminApi);
  baseRoute.use("/search", searchApi);
  baseRoute.use("/hotels", hotelApi);
  baseRoute.use("/rooms", roomApi);
  baseRoute.use("/reservations", validateToken, reservationApi);
};

export default routers;
