// @ts-nocheck
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import config from "./config.js";
const CONNECTION_URL = config.CONNECTION_URL;
const PORT = process.env.PORT || 3000;

const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(CONNECTION_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
