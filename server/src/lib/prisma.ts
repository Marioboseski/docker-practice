import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";

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

export const prisma = new PrismaClient({ adapter });