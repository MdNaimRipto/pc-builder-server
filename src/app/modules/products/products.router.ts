import express from "express";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { ProductsValidation } from "./products.validation";
import { ProductsController } from "./products.controller";

const router = express.Router();

router.get("/getAllProducts", ProductsController.getAllProducts);

router.get("/getFeaturedProducts", ProductsController.getFeaturedProducts);

router.get("/getProductsByCategory", ProductsController.getProductsByCategory);

router.get("/getProductsByID/:id", ProductsController.getProductsByID);

router.patch(
  "/addReview/:id",
  zodValidationRequest(ProductsValidation.reviewBookZodSchema),
  ProductsController.addReview
);

router.patch(
  "/updateRating/:id",
  zodValidationRequest(ProductsValidation.updateRatingBookZodSchema),
  ProductsController.updateRating
);

export const ProductsRouter = router;
