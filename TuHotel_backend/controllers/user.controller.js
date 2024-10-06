import UserModel from "../models/User.model.js";

class User {
  async getAllUsers(req, res) {
    const users = await UserModel.findAll();
    try {
      if (!users || users.length <= 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron usuarios",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Todos los usuarios",
        // data: [
        //   ...users,
        // ],
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByToken(req, res) {
    const userEmail = req?.userEmail;

    try {
      if (!userEmail) {
        return res.status(404).json({
          success: false,
          message: "Usuario no tiene token",
        });
      }

      const userById = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!userById) {
        return res.status(404).json({
          success: false,
          message: "no se encontro el usuario",
        });
      }

      return {
        success: true,
        length: 1,
        data: {
          ...userById?.dataValues,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  async isUserAdmin(req, res) {
    const userEmail = req?.userEmail;

    try {
      const userById = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      if (userById?.isAdmin) {
        return res.status(200).json({
          success: true,
          message: "El usuario es administrador",
        });
      }

      return res.status(200).json({
        success: false,
        message: "El usuario no es administrador",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
