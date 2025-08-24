const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files from public/
app.use(express.static(path.join(__dirname, "public")));

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// ✅ Basic test route
app.get("/api", (req, res) => {
  res.send("🎶 VibeVault MVP (Paystack-only API)");
});

// ✅ Initialize a Paystack payment
app.post("/api/pay", async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      status: "success",
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// ✅ Verify a Paystack payment
app.get("/api/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    res.json({
      status: response.data.data.status,
      amount: response.data.data.amount,
      customer: response.data.data.customer.email
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 VibeVault (Paystack-only) running on port ${PORT}`);
});
