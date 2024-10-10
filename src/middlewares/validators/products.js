import { body, param } from "express-validator";
import { Types } from "mongoose";

export const createProduct = [
  body("name").isString().notEmpty().withMessage("Name is required."),
];

export const getProductById = [
  param("id")
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage("Id is invalid"),
];

export const updateProduct = [
  param("id")
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage("Id is invalid"),
  body("name").isString().notEmpty().withMessage("Name is required."),
];
export const deleteProduct = [
  param("id")
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage("Id is invalid"),
];
