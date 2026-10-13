import express from "express";
import cors from "cors";
import productRoutes from "./routes/productsRoutes.js";
import categoryRoutes from "./routes/categoriesRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})