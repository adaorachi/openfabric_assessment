import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
    cartItems: [
      {
        _id: String,
        name: String,
        price: Number,
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model('orders', orderSchema);

export default Order;
