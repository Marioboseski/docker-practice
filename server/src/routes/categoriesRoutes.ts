import { Router } from "express";
import { getCategories } from "../controllers/categoriesContoller.js";

const router = Router();

router.get("/", getCategories);

export default router;