const express = require("express");
const connectMongoDB = require("./src/db/mongo/mongoConnection.js");
const pool = require("./src/db/postgres/postgresConnection.js"); // Postgres connection (kept for reference)
const productRoutes = require("./src/routes/mongo/productRoutes.js"); // Corrected typo: `ProductRoutes`
const cartRoutes = require("./src/routes/mongo/cartRoutes.js");
const authRoutes = require("./src/routes/postgres/authRoutes.js");
const cors = require("cors");
const morgan = require("morgan"); // Corrected typo
const helmet = require("helmet"); // Optional security addition

const app = express();

// Connect to MongoDB
connectMongoDB(); // Initialize MongoDB connection

// Use CORS to allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend URL
    credentials: true,
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet()); // Optional security headers

// Routes
app.use("/api/products", productRoutes); // Routes for MongoDB products
app.use("/api/auth", authRoutes); // Use auth login purpose routes
app.use("/api/cart", cartRoutes); // cart routes

module.exports = app;
