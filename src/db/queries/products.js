import { Product } from "../models/product.js";

export const getProducts = async () => await Product.find().exec();

export const createProduct = async (name) => {
  const newProduct = new Product({
    name,
  });
  await newProduct.save();
  return newProduct;
};

export const getProductByName = async (name) =>
  await Product.findOne({ name }).exec();

export const getProductById = async (id) => await Product.findById(id).exec();

export const updateProduct = async (id, data) =>
  await Product.findByIdAndUpdate(id, data, { new: true }).exec();

export const deleteProduct = async (id) =>
  await Product.findByIdAndDelete(id).exec();
