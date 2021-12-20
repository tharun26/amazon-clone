/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");

const cors = require("cors");
const stripe = require("stripe")(
  "<STRIPE_TEST_KEY>"
);

// API

// -App config
const app = express();

// -Middleware
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

// -API Routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
/*eslint-disable */

app.post("/payments/create", async (request, response) => {
  console.log("Hi tharun");
  const total = request.query.total;
  console.log("Payment reqiest recevied Bookm!!!", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    description: "Software development services",
    shipping: {
      name: "tharun",
      address: {
        line1: "SAMPLE",
        postal_code: "64356",
        city: "Chennai",
        state: "ARIZONA",
        country: "US",
      },
    },
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
/*eslint-enable */

// -Listen Command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-98178/us-central1/api
