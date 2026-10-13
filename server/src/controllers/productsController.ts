import * as productService from "../services/productsServices.js";
import type { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getProducts()

  return res.json(products);
}

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await productService.getProductById(Number(id));

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

  return res.json(product);
}