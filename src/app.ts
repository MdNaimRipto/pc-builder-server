import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./middleware/globalErrorHandler";
import pathNotFoundErrorHandler from "./errors/pathNotFoundErrorHandler";
import { Routers } from "./app/routes/router";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic get function
app.get("/", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    message: "PC Builder Server running successfully",
    statusCode: httpStatus.OK,
  });
});

// Main endpoint
app.use("/v1.0.0", Routers);

// Global error Handler
app.use(globalErrorHandler);

// Path Not Found Error Handler
app.use(pathNotFoundErrorHandler);

export default app;
