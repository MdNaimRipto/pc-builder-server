import express from "express";
import { ProductsRouter } from "../modules/products/products.router";

const router = express.Router();

const routes = [
  {
    path: "/products",
    route: ProductsRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;
