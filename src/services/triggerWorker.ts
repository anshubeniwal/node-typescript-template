import { logger } from "@/utils/logger";

export const triggerTestWorker = async (data: any) => {
  try {
    // action
    console.log(data);
  } catch (error) {
    logger.error(error);
  }
};
