import express from "express";
import { shopify } from "../shopify/shopify.js";

const router = express.Router();

// Shopify webhook handler
router.post("/*", async (req, res) => {
  try {
    await shopify.webhooks.process({
      rawBody: req.body,
      rawRequest: req,
      rawResponse: res,
    });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    res.status(500).send("Webhook error");
  }
});

// Example webhook registration (you can add more later)
shopify.webhooks.addHandlers({
  PRODUCTS_CREATE: {
    deliveryMethod: shopify.webhooks.deliveryMethods.Http,
    callbackUrl: "/webhooks/products/create",
  },
});

export default router;
