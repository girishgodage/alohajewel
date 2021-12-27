const express = require("express");
let router = express.Router();
const dotenv = require("dotenv");

dotenv.config();
//dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-checkout-session", async (req, res) => {
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

      success_url: `/success`,
      cancel_url: `/canceled`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
