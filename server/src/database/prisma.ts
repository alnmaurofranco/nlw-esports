import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  errorFormat: "colorless",
  log: ["query", "error"],
});
