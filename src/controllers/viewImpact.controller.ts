import { Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { viewImapact } from "MockJson";
import { logger } from "@/utils/logger";

const viewImpact = (req: Request | any, res: CustomResponse): void => {
  try {
    const {
      query: { impactId },
    } = req;
    return res.success({ data: viewImapact[impactId] });
  } catch (error) {
    logger.error(error.stack);
    return res.failure({});
  }
};

export const ViewImpactController = {
  viewImpact,
};
