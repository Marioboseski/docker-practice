import { prisma } from "../lib/prisma.js";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc"
    }
  });
  return products;
}

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
     id,
    },
  });

  return product;
}