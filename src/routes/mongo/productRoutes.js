const express = require("express");
const {
  getOne,
  getAll,
  create,
  update,
  deleteProduct,
} = require("./../../controllers/mongo/productController.js");
const { authenticate, authorize } = require("../../Middleware/authMiddleware.js");

const route = express.Router();

route.post("/create", authenticate, authorize(["admin", "seller"]), create);
route.get("/getAll", getAll);
route.get("/getOne/:id", authenticate, authorize(["admin", "seller", "user"]), getOne);
route.put("/update/:id", authenticate, authorize(["admin", "seller"]), update);
route.delete("/delete/:id", authenticate, authorize(["admin"]), deleteProduct);

module.exports = route;
