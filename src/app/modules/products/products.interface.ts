import { Model } from "mongoose";

export type IProducts = {
  image: string;
  productName: string;
  category: string;
  status: boolean;
  price: number;
  description: string;
  keyFeatures: string[];
  individualRating: number;
  allRating: number[];
  rating: number;
  reviews: [
    {
      reviewerName: string;
      review: string;
    }
  ];
};

export type IReview = {
  reviewerName: string;
  review: string;
};

export type ProductsModel = Model<IProducts, object>;
