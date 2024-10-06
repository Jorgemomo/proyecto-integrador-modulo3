import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import "./db/association.js";
import routers from "./routes/api.routes.js";

const app = express();

const port = process.env.PORT;
//Middleware
app.use(morgan("dev"));

app.use(express.json());

app.use(cors()); // uso de cors para permitir que los recursos sean accesibles desde otros sitios web

routers(app);

//settings
app.set(port, 3000);

app.listen(app.get(port), () => {
  console.log(`Server running on port ${app.get(port)}`);
});
