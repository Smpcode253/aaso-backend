import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Aaso backend is running.");
});

export default router;
