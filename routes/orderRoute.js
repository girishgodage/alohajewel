const express = require("express");
const router = express.Router();

const { isAuth, isAdmin } = require("../util");

const Order = require("../models/order");

router.get("/", async (req, res) => {
  //const orders = await Order.find({}).populate("user");
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.send(orders);
});

router.get("/mine/:id", async (req, res) => {
  const orders = await Order.find({ userId: req.params.id }).sort({
    createdAt: -1,
  });
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.delete("/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body.userId);
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    userId: req.body.userId,
    userName: req.body.userName,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    orderComment: req.body.orderComment,
    contactNumber: req.body.contactNumber,
  });
  const newOrderCreated = await newOrder.save((err, doc) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: server error",
      });
    }

    return res.send({
      success: true,
      message: "New Order Created",
      orderId: doc._id,
      payerId: doc.userId,
    });
  });
  //res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.put("/:id/pay", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "Stripe",
      paymentResult: {
        payerID: req.body.payerId,
        orderID: req.body.orderId,
        // paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found." });
  }
});

router.put("/deliver/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: "Order Delivered.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found." });
  }
});

module.exports = router;
