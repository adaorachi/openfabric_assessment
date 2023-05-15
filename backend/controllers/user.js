import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../schema/user.js";
import config from "../config.js";

const SECRET_TOKEN = config.JWT_SECRET_KEY;

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await registerSchema.validateAsync({ email, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    const createdUser = await newUser.save();

    const token = jwt.sign(
      { email: createdUser.email, userId: createdUser._id },
      SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).send({ token: token, expiresIn: 3600 });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginSchema.validateAsync({ email, password });

    const loggedInUser = await User.findOne({ email });

    if (!loggedInUser) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, loggedInUser.password);

    if (!checkPassword) {
      throw new Error("Email/Password is incorrect");
    }

    const token = jwt.sign(
      { email: loggedInUser.email, userId: loggedInUser._id },
      SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).send({ token: token, expiresIn: 3600 });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
