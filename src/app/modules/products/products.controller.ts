import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IProducts } from "./products.interface";
import { ProductsService } from "./products.service";

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductsService.getAllProducts();
  sendResponse<IProducts[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Retrieved Successfully",
    data: result,
  });
});

const getFeaturedProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductsService.getFeaturedProducts();
  sendResponse<IProducts[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Retrieved Successfully",
    data: result,
  });
});

const getProductsByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const category = req.query.category as string;
    const result = await ProductsService.getProductsByCategory(category);
    sendResponse<IProducts[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Products Retrieved Successfully",
      data: result,
    });
  }
);

const getProductsByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductsService.getProductsByID(id);
  sendResponse<IProducts | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Retrieved Successfully",
    data: result,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID, review } = req.body;
  const result = await ProductsService.addReview(id, userID, review);
  sendResponse<IProducts | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: result,
  });
});

const updateRating = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating } = req.body;
  const result = await ProductsService.updateRating(id, rating);
  sendResponse<IProducts | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: result,
  });
});

export const ProductsController = {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByID,
  addReview,
  updateRating,
};
