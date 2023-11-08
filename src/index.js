// Desc: Main entry point for the application
// const express = require("express"); // CommonJS
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";

const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/productos", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
