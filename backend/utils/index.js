import jwt from "jsonwebtoken";

export const checkValidRequest = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, "on-shop_secret_token@1234");
    next();
  } catch (error) {
    return res.status(400).send({ message: "Error with Authorization Token" });
  }
};
