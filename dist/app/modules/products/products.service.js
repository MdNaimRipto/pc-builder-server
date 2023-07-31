"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const products_schema_1 = require("./products.schema");
// Get All Products Function:
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_schema_1.Products.find();
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Products Found");
    }
    return result;
});
// Get All Products Function:
const getFeaturedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_schema_1.Products.find();
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Products Found");
    }
    const randomIndices = [];
    while (randomIndices.length < 6) {
        const randomIndex = Math.floor(Math.random() * result.length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }
    // Select the random objects based on the generated indices
    const randomProducts = randomIndices.map(index => result[index]);
    return randomProducts;
});
// Get All Products Function:
const getProductsByCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_schema_1.Products.find({ category: payload });
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Products Found");
    }
    return result;
});
// Get Products By ID Function:
const getProductsByID = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_schema_1.Products.findById({ _id: payload });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found");
    }
    return result;
});
// Add Review Function:
const addReview = (id, useID, review) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield products_schema_1.Products.findById({ _id: useID });
    if (!checkUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! User Does Not Exists.");
    }
    const isExists = yield products_schema_1.Products.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const { reviews } = isExists;
    if (reviews) {
        reviews.push(review);
    }
    const result = yield products_schema_1.Products.findOneAndUpdate({ _id: id }, isExists, {
        new: true,
    });
    return result;
});
// Update Rating Function:
const updateRating = (id, newRating) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield products_schema_1.Products.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const { allRating } = isExists;
    if (allRating) {
        allRating.push(newRating);
        const totalRating = allRating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const ratingCount = allRating.length - 1;
        const avgRating = totalRating / ratingCount;
        isExists.rating = avgRating >= 5 ? 5 : parseFloat(avgRating.toFixed(1));
    }
    const result = yield products_schema_1.Products.findOneAndUpdate({ _id: id }, isExists, {
        new: true,
    });
    return result;
});
exports.ProductsService = {
    getAllProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getProductsByID,
    addReview,
    updateRating,
};
