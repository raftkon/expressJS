import e from "express";

import * as controllers from "../controllers/products.js";
import { validateRequest } from "../middlewares/validate-request.js";
import * as validators from "../middlewares/validators/products.js";

const router = e.Router();

router
  .route("/")
  .get(controllers.getProducts)
  .post(validators.createProduct, validateRequest, controllers.createProduct);
router
  .route("/:id")
  .get(validators.getProductById, validateRequest, controllers.getProductById)
  .put(validators.updateProduct, validateRequest, controllers.updateProduct)
  .delete(validators.deleteProduct, validateRequest, controllers.deleteProduct);

export { router as productsRouter };
