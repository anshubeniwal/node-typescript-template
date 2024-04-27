import { Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { logger } from "@/utils/logger";
import models from "@/models";

const accountDetails = async (req: Request | any, res: CustomResponse) => {
  try {
    const {
      query: { accountId },
    } = req;
    const accountSummary = await models.user_summary.findAll({
      where: {
        api_type: "account",
        status: 1,
      },
      raw: true,
    });
    if (accountSummary.length)
      return res.success({ data: accountSummary[0].json_value[accountId] });
    else res.success({ data: [], msg: "No data found" });
  } catch (error) {
    logger.error(error.stack);
    return res.failure({});
  }
};

export const AccountDetailsController = {
  accountDetails,
};
