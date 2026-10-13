import { prisma } from "../lib/prisma.js";

export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    }
  });

  return categories;
}