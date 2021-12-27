const express = require("express");

let router = express.Router();

const BlogPost = require("../models/blogPost");
const User = require("../models/User");
const UserSession = require("../models/UserSession");
const Order = require("../models/Order");

// Blog Routes
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {});
});

router.post("/save", (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    // BlogPost
    return res.json({
      msg: "Your data has been saved!!!!!!",
    });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "aoaoaoao",
    age: "33",
  };
  res.json(data);
});

// login routes

/*
 * Sign up
 */
router.post("/account/signup", (req, res, next) => {
  const { body } = req;
  // body = req.body;
  // console.log(body);
  const { firstName, lastName, password } = body;
  let { email } = body;
  if (!firstName) {
    return res.send({
      success: false,
      message: "Error: Missing first name.",
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: "Error: Missing last name.",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  email = email.toLowerCase();
  //email = email.trim();
  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exist.",
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          message: "Signed up",
        });
      });
    }
  );
});
// end of sign up

/*
 * Sign in
 */
router.post("/account/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }
  email = email.toLowerCase();
  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid!",
        });
      }
      const user = users[0];
      // console.log(user);
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid!",
        });
      }

      //Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error",
          });
        }
        console.log(user.cart);
        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id,
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          cart: [],
        });
      });
    }
  );
});
// end of sign in

// verify
router.get("/account/verify", (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
  //?token = test

  // verify the token
  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        //// console.log(err);
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid",
        });
      } else {
        return res.send({
          success: true,
          message: "Good",
        });
      }
    }
  );
});
// end of verify

/*
 * Log out
 */
router.get("/account/logout", (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
  //?token = test

  // verify the token
  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: { isDeleted: true },
    },
    null,
    (err, sessions) => {
      if (err) {
        // console.log(err);
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      return res.send({
        success: true,
        message: "Good",
      });
    }
  );
});
// end of log logout

//update cart
router.post("/account/update", (req, res, next) => {
  // get the token
  const { body } = req;
  const { cart } = body;
  let { email } = body;

  //email = email.toLowerCase();

  // console.log('update', body);

  User.findOneAndUpdate(
    {
      email: email,
      // cart:[],
      // isDeleted: false
    },
    {
      $set: { cart: cart },
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      return res.send({
        success: true,
        message: "Updated",
        email: email,
        // cart: cart
      });
    }
  );
});
//end of update cart

//Code for Stripe Checkout
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/stripe/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: req.body.tax * 100 + req.body.ship * 100,
              currency: "inr",
            },
            display_name: "Tax & Shipping",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: ["http:" + item.images],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/canceled`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Code for Order Routes

router.get("/order/", async (req, res) => {
  //const orders = await Order.find({}).populate("user");
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.send(orders);
});

router.get("/order/mine/:id", async (req, res) => {
  const orders = await Order.find({ userId: req.params.id }).sort({
    createdAt: -1,
  });
  res.send(orders);
});

router.get("/order/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.delete("/order/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.post("/order/", async (req, res) => {
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

router.put("/order/:id/pay", async (req, res) => {
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

router.put("/order/deliver/:id", async (req, res) => {
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
