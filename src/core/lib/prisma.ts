import { PrismaClient } from "@prisma/client";
import { env } from "@/core/config/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Singleton Prisma Client Connection Pooler.
 * Prevents system degradation due to active connection exhaustions during Next.js Hot Module Reload.
 */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
