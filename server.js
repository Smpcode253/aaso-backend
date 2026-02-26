import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { shopify } from "./shopify/shopify.js";
import authRoutes from "./routes/auth.js";
import webhookRoutes from "./routes/webhooks.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Shopify OAuth + session handling
app.use("/auth", authRoutes);

// Shopify webhooks
app.use("/webhooks", webhookRoutes);

// Root route (App URL)
app.get("/", async (req, res) => {
  res.status(200).send("AAOS backend is online.");
});

// Render health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AAOS backend running on port ${PORT}`);
});
