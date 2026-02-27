import express from "express";
import dotenv from "dotenv";
import shopify from "./shopify/shopify.js";
import authRoutes from "./routes/auth.js";
import indexRoutes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
