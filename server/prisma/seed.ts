import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const adapter = new PrismaMariaDb({
  host: getRequiredEnv("DATABASE_HOST"),
  port: Number(getRequiredEnv("DATABASE_PORT")),
  user: getRequiredEnv("DATABASE_USER"),
  password: getRequiredEnv("DATABASE_PASSWORD"),
  database: getRequiredEnv("DATABASE_NAME"),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });


async function main(): Promise<void> {
  const categories = [
    "Laptops",
    "Smartphones",
    "Tablets",
    "Accessories",
    "Smartwatches",
  ];

  for (const name of categories) {
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: { name },
      });

      console.log(`Created category: ${name}`);
    }
  }

  const products = [
    { name: "Lenovo IdeaPad Slim 5", price: 749.99, category: "Laptops" },
    { name: "ASUS VivoBook 15", price: 599.99, category: "Laptops" },
    { name: "Acer Aspire 5", price: 649.99, category: "Laptops" },

    { name: "Samsung Galaxy A56", price: 449.99, category: "Smartphones" },
    { name: "Xiaomi Redmi Note 14", price: 229.99, category: "Smartphones" },
    { name: "Apple iPhone 16", price: 899.99, category: "Smartphones" },

    { name: "Apple iPad 11-inch", price: 399.99, category: "Tablets" },
    { name: "Samsung Galaxy Tab S10 FE", price: 499.99, category: "Tablets" },
    { name: "Xiaomi Redmi Pad Pro", price: 329.99, category: "Tablets" },

    { name: "Logitech M185 Mouse", price: 19.99, category: "Accessories" },
    { name: "Logitech K380 Keyboard", price: 49.99, category: "Accessories" },
    { name: "JBL Tune 520BT Headphones", price: 39.99, category: "Accessories" },

    { name: "Samsung Galaxy Watch7", price: 299.99, category: "Smartwatches" },
    { name: "Apple Watch SE", price: 249.99, category: "Smartwatches" },
    { name: "Xiaomi Redmi Watch 5", price: 99.99, category: "Smartwatches" },
  ];

  for (const product of products) {
    const category = await prisma.category.findFirst({
      where: { name: product.category },
    });

    if (!category) {
      throw new Error(`Category not found: ${product.category}`);
    }

    const existingProduct = await prisma.product.findFirst({
      where: {
        name: product.name,
        categoryId: category.id,
      },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          categoryId: category.id,
        },
      });

      console.log(`Created product: ${product.name}`);
    }
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });