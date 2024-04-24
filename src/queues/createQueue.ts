import Queue from "bull";
import { config } from "@/config.server";
import { logger } from "@/utils/logger";

export const createQueue = ({
  name,
  attempts = 1,
  removeOnComplete = true,
  backoff = "exponential",
}) => {
  logger.info(`New queue created - ${name}`);
  return new Queue(name, {
    redis: config.redisUrl,
    prefix: `ramfin:${name}:${config.nodeEnv}`,
    defaultJobOptions: {
      attempts,
      removeOnComplete,
      backoff: { type: backoff },
    },
  });
};
