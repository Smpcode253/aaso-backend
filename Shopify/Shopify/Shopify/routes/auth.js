import express from "express";
import shopify from "../shopify/shopify.js";

const router = express.Router();

router.get("/install", async (req, res) => {
  const authUrl = await shopify.auth.begin({
    shop: req.query.shop,
    callbackPath: "/auth/callback"
  });
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res
  });

  res.redirect(`/?shop=${req.query.shop}`);
});

export default router;
