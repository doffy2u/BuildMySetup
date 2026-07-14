import pino from "pino";
import { env } from "@/core/config/env";

/**
 * High-performance, structured JSON Logging Engine.
 * Logs out fully indexed JSON objects suitable for cloud log parsing pipelines (AWS, Datadog).
 */
export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  base: {
    env: env.NODE_ENV,
    service: "buildsetup-core",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
