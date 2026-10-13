import * as categoriesService from "../services/categoriesServices.js";
import type { Request, Response } from "express";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await categoriesService.getCategories();

  return res.json(categories);
}