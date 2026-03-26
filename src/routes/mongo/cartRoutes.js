// cartRoutes.js
const express = require("express");
const { authenticate } = require("../../Middleware/authMiddleware.js");
const { addToCart, getCartItems, deleteCartItem, updateQuantity } = require("../../controllers/mongo/cartController.js");

const router = express.Router();

router.post("/add", authenticate, addToCart);
router.get("/get", authenticate, getCartItems);
router.delete("/deleteItem/:productId", authenticate, deleteCartItem);
router.put("/updateItem", authenticate, updateQuantity);

module.exports = router;
