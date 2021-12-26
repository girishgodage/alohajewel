const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

router.post("/send", (req, res) => {
  const { name, email, message, subject } = req.body;
  transporter
    .sendMail({
      to: "girishgodage_007@hotmail.com",
      from: email,
      subject: subject,
      html: `<h3>${name}</h3>
        <p>${message}</p>`,
    })
    .then((resp) => {
      res.json({ resp });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
