import { z } from "zod";

const reviewBookZodSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "Seller ID is Required",
    }),
    review: z.object({
      reviewerName: z.string({
        required_error: "Reviewer Name is Required",
      }),
      review: z.string({
        required_error: "Review is Required",
      }),
    }),
  }),
});

const updateRatingBookZodSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "Seller ID is Required",
    }),
    rating: z.number({
      required_error: "Rating is Required",
    }),
  }),
});

export const ProductsValidation = {
  reviewBookZodSchema,
  updateRatingBookZodSchema,
};
