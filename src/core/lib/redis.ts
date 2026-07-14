import Redis from "ioredis";
import { env } from "@/core/config/env";
import { logger } from "./logger";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

/**
 * Core caching & high-throughput memory engine pool instance.
 */
export const redis =
  globalForRedis.redis ??
  new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 100, 3000);
      return delay;
    },
  });

redis.on("error", (err) => {
  logger.error({ err }, "Redis execution engine exception caught");
});

if (env.NODE_ENV !== "production") globalForRedis.redis = redis;
