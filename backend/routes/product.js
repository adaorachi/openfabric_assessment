import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/product.js";
import { checkValidRequest } from "../utils/index.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", [checkValidRequest], createProduct);
router.patch("/:id", [checkValidRequest], editProduct);
router.delete("/:id", [checkValidRequest], deleteProduct);

export default router;
