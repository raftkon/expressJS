import * as q from "../db/queries/products.js";

export const getProducts = async (req, res) => {
  const products = await q.getProducts();
  res.send({ products });
};

export const createProduct = async (req, res) => {
  const { name } = req.body;

  const newProduct = await q.createProduct(name);
  res.send({ product: newProduct });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await q.getProductById(id);
  res.send({ product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedProduct = await q.updateProduct(id, { name });
  res.send({ product: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await q.deleteProduct(id);
  res.send({ product: deletedProduct });
};
