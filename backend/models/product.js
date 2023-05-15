import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ["wears", "food", "gadgets"],
  },
  price: { type: Number, required: true },
});

const Product = mongoose.model("products", productSchema);

export default Product;
