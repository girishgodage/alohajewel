// step 1 - Import npm packages
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");

// Load config
dotenv.config();
//dotenv.config({ path: "./config/config.env" });

// step 2 - Initialize Express & cors
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const routes = require("./routes/api");
//const striperoutes = require("./routes/striperoute");
//const orderroutes = require("./routes/orderroute.js");
// const emailroutes = require("./routes/email.js");

// Step 3 - Connect to MongoDB
connectDB();

// treat requests as json requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const clienturl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:3001";

console.log(clienturl);
app.use(
  cors({
    origin: clienturl,
  })
);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", routes);
//app.use("/api/stripe", striperoutes);
//app.use("/api/order", orderroutes);
// app.use("/api/email", emailroutes);

//step 4
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} at ${PORT}`)
);
