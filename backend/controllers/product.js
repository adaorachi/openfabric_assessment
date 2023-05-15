import Product from "../models/product.js";
import { createProductSchema, editProductSchema } from "../schema/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("Invalid params");
    }
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    await createProductSchema.validateAsync(product);

    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    if (!id) {
      throw new Error("Invalid params");
    }

    await editProductSchema.validateAsync({ id, ...product });

    const updatedProduct = await Product.findByIdAndUpdate(id, product);

    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("Invalid params");
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
