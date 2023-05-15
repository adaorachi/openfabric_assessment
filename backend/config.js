import dotenv from "dotenv";
dotenv.config();

export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CONNECTION_URL: process.env.CONNECTION_URL,
};
