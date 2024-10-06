import jwt from "jsonwebtoken";

export const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    const payload = { data };

    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY || "SECRET_KEY",
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se pudo generar token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const validateToken = (req, res, next) => {
  const token = req.header("x-token");
  // console.log("header-toker", token);

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "No token",
    });
  }

  try {
    const resultToken = jwt.verify(
      token,
      process.env.SECRET_PRIVATE_KEY || "SECRET_KEY"
    );
    // console.log("result", resultToken);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "401 no está autorizado",
    });
  }
};
