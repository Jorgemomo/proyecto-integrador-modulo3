import bcript from "bcryptjs";
import UserModel from "../models/User.model.js";
import { generateToken } from "../helpers/authToken.js";

class Auth {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const existUser = await UserModel.findOne({ where: { email } });

      if (!existUser) {
        return res.status(401).json({
          success: false,
          message: "El usuario no esta registrado",
        });
      }

      const validPassword = bcript.compareSync(password, existUser?.password);

      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "La contraseña es inválida",
        });
      }

      const token = await generateToken({
        id: login?.id,
        email: login?.email,
      });

      return res.status(200).json({
        success: true,
        data: {
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const existUser = await UserModel.findOne({ where: { email } });

      if (existUser) {
        return res.status(400).json({
          success: false,
          message: "El usuario ya está registrado",
        });
      }

      const salt = bcript.genSaltSync();
      const passwordHash = bcript.hashSync(password, salt);

      await UserModel.create({
        name,
        email,
        password: passwordHash,
        phoneNumber: null,
        address: null,
        isAdmin: false,
      });

      return res.status(201).json({
        success: true,
        message: "El usuario registrado",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Auth;
