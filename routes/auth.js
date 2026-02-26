import express from "express";
import { shopify } from "../shopify/shopify.js";

const router = express.Router();

// Start OAuth
router.get("/", async (req, res) => {
  await shopify.auth.begin({
    shop: req.query.shop,
    callbackPath: "/auth/callback",
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
});

// OAuth callback
router.get("/callback", async (req, res) => {
  await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res,
  });

  const redirectUrl = `/?shop=${req.query.shop}`;
  res.redirect(redirectUrl);
});

export default router;
