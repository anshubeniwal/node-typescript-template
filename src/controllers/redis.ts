import { config } from "@/config.server";
import { testQueue } from "@/services/cache";
import { triggerTestWorker } from "@/services/triggerWorker";
import { logger } from "@/utils/logger";

testQueue.process(config.nodeEnv, 4, function (job) {
  try {
    return triggerTestWorker(job.data);
  } catch (error) {
    logger.error(error);
  }
});

testQueue.on("failed", (job: any, err: any) => {
  logger.error(err);
});

testQueue.on("error", (job: any, err: any) => {
  logger.error(err);
});

const dispatchFromQueue = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Dispatching");
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};

const writeToTestQueue = async (data: any) => {
  try {
    return await testQueue.add(config.nodeEnv, data, {
      attempts: 3,
      removeOnComplete: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const redisController = { dispatchFromQueue, writeToTestQueue };
