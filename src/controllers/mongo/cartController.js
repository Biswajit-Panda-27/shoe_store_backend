const Cart = require("../../models/mongo/cartModels.js");

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ error: "Cart is empty" });

    res.status(200).json(cart.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart is empty" });

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).json({ message: "Product deleted from cart" });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New updateQuantity function
const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart is empty" });

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Quantity updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating quantity" });
  }
};

module.exports = { addToCart, getCartItems, deleteCartItem, updateQuantity };
