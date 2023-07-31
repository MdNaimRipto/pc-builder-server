import { Schema, model } from "mongoose";
import { IProducts, ProductsModel } from "./products.interface";

export const productsSchema = new Schema<IProducts, ProductsModel>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Products = model<IProducts, ProductsModel>(
  "Products",
  productsSchema
);
