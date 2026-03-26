const express = require("express");
const authController = require("../../controllers/postgres/authController.js");
const { authenticate } = require("../../Middleware/authMiddleware.js");

const router = express.Router();

// Define the routes
router.post("/login",authController.login);
router.post("/signup", authController.signup);
router.delete("/deleteUser/:id",authenticate, authController.deleteUser);
router.get("/userprofile",authenticate, authController.userProfile);

module.exports = router;
