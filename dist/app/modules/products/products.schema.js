"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.productsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productsSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    keyFeatures: [{ type: String, required: true }],
    individualRating: { type: Number, required: true, default: 0 },
    allRating: [{ type: Number, required: true, default: 0, select: 0 }],
    rating: { type: Number, required: true, default: 0 },
    reviews: {
        type: [
            {
                id: { type: Number, required: true },
                reviewerName: { type: String, required: true },
                review: { type: String, required: true },
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Products = (0, mongoose_1.model)("Products", exports.productsSchema);
