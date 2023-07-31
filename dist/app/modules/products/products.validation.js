"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsValidation = void 0;
const zod_1 = require("zod");
const reviewBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
        review: zod_1.z.object({
            reviewerName: zod_1.z.string({
                required_error: "Reviewer Name is Required",
            }),
            review: zod_1.z.string({
                required_error: "Review is Required",
            }),
        }),
    }),
});
const updateRatingBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
        rating: zod_1.z.number({
            required_error: "Rating is Required",
        }),
    }),
});
exports.ProductsValidation = {
    reviewBookZodSchema,
    updateRatingBookZodSchema,
};
