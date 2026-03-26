const { json } = require("express");
const productModel = require("../../models/mongo/productModel.js");

const create = async (req, res) => {
  try {
    const productData = new productModel(req.body);

    if (!productData) {
      return res.status(404).json({ msg: "Product data not found!" });
    }
    const savedProductData = await productData.save();
    res.status(201).json({ msg: "Product created successfully." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const productData = await productModel.find();
    if (!productData) {
      return res.status(404).json({ msg: "Products data not found." });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found with this id" });
    }
    res.status(200).json({ msg: "Product found", data: product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found with this id" });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found for this id" });
    }
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Product deleted successfully", data: product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteProduct
};
