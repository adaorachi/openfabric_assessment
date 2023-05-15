import Order from "../models/order.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { orderDetail } = req.body;

  try {
    const newOrder = new Order(orderDetail);
    const savedOrder = await newOrder.save();

    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === "undefined") {
      return res.status(400).send({ message: "Invalid ID params" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    res.status(200).send(deletedOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
