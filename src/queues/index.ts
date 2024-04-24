import { config } from "@/config.server";
import Redis from "ioredis";
import { createQueue } from "./createQueue";

export const redis = new Redis(config.redisUrl, {
  keyPrefix: `ramfin:${config.nodeEnv}`,
});

redis.on("error", (err) => {
  console.log(err);
  process.exit(err ? 1 : 0);
});

export default { redis, createQueue };
