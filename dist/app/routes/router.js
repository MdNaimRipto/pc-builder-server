"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("../modules/products/products.router");
const router = express_1.default.Router();
const routes = [
    {
        path: "/products",
        route: products_router_1.ProductsRouter,
    },
];
routes.map(r => router.use(r.path, r.route));
exports.Routers = router;
