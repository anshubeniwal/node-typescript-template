import { Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { reportSummaryData } from "MockJson";
import { logger } from "@/utils/logger";

const reportSummary = (req: Request | any, res: CustomResponse): void => {
  try {
    const {
      query: { provider },
    } = req;
    return res.success({ data: reportSummaryData[provider] });
  } catch (error) {
    logger.error(error.stack);
    return res.failure({});
  }
};

export const ReportController = {
  reportSummary,
};
