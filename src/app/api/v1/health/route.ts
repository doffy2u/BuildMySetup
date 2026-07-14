import { NextResponse } from "next/server";
import { db } from "@/core/lib/prisma";
import { redis } from "@/core/lib/redis";
import { logger } from "@/core/lib/logger";

/**
 * Core health assessment endpoint for Orchestrator monitoring (Docker, Kubernetes, Vercel).
 * Evaluates core system state, checking active connections to both database and cache layers.
 */
export async function GET() {
  try {
    // Ping DB
    await db.$queryRaw`SELECT 1`;

    // Ping Redis
    await redis.ping();

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        services: {
          database: "up",
          cache: "up",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error({ error }, "Healthcheck evaluation detected failures.");
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        details: "One or more critical infrastructure adapters are unresponsive.",
      },
      { status: 503 }
    );
  }
}
