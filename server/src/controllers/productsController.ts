import * as productService from "../services/productsServices.js";
import type { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getProducts()

  return res.json(products);
}