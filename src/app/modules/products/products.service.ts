/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProducts, IReview } from "./products.interface";
import { Products } from "./products.schema";

// Get All Products Function:
const getAllProducts = async (): Promise<IProducts[]> => {
  const result = await Products.find();
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products Found");
  }
  return result;
};

// Get All Products Function:
const getFeaturedProducts = async (): Promise<IProducts[]> => {
  const result = await Products.find();
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products Found");
  }
  const randomIndices: number[] = [];
  while (randomIndices.length < 6) {
    const randomIndex = Math.floor(Math.random() * result.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  // Select the random objects based on the generated indices
  const randomProducts = randomIndices.map(index => result[index]);

  return randomProducts;
};

// Get All Products Function:
const getProductsByCategory = async (payload: string): Promise<IProducts[]> => {
  const result = await Products.find({ category: payload });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products Found");
  }
  return result;
};

// Get Products By ID Function:
const getProductsByID = async (payload: string): Promise<IProducts | null> => {
  const result = await Products.findById({ _id: payload });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found");
  }
  return result;
};

// Add Review Function:
const addReview = async (
  id: string,
  useID: string,
  review: IReview
): Promise<IProducts | null> => {
  const checkUser = await Products.findById({ _id: useID });
  if (!checkUser) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! User Does Not Exists."
    );
  }

  const isExists = await Products.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const { reviews } = isExists;
  if (reviews) {
    reviews.push(review);
  }

  const result = await Products.findOneAndUpdate({ _id: id }, isExists, {
    new: true,
  });

  return result;
};

// Update Rating Function:
const updateRating = async (
  id: string,
  newRating: number
): Promise<IProducts | null> => {
  const isExists = await Products.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const { allRating } = isExists;

  if (allRating) {
    allRating.push(newRating);
    const totalRating = allRating.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const ratingCount = allRating.length - 1;
    const avgRating = totalRating / ratingCount;
    isExists.rating = avgRating >= 5 ? 5 : parseFloat(avgRating.toFixed(1));
  }
  const result = await Products.findOneAndUpdate({ _id: id }, isExists, {
    new: true,
  });
  return result;
};

export const ProductsService = {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByID,
  addReview,
  updateRating,
};
