import { Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { accountDetailsData } from "MockJson";
import { logger } from "@/utils/logger";

const accountDetails = (req: Request | any, res: CustomResponse): void => {
  try {
    const {
      query: { accountId },
    } = req;
    return res.success({ data: accountDetailsData[accountId] });
  } catch (error) {
    logger.error(error.stack);
    return res.failure({});
  }
};

export const AccountDetailsController = {
  accountDetails,
};
