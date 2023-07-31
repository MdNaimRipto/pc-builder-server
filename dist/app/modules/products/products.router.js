"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const products_validation_1 = require("./products.validation");
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.get("/getAllProducts", products_controller_1.ProductsController.getAllProducts);
router.get("/getFeaturedProducts", products_controller_1.ProductsController.getFeaturedProducts);
router.get("/getProductsByCategory", products_controller_1.ProductsController.getProductsByCategory);
router.get("/getProductsByID/:id", products_controller_1.ProductsController.getProductsByID);
router.patch("/addReview/:id", (0, zodValidationRequest_1.default)(products_validation_1.ProductsValidation.reviewBookZodSchema), products_controller_1.ProductsController.addReview);
router.patch("/updateRating/:id", (0, zodValidationRequest_1.default)(products_validation_1.ProductsValidation.updateRatingBookZodSchema), products_controller_1.ProductsController.updateRating);
exports.ProductsRouter = router;
