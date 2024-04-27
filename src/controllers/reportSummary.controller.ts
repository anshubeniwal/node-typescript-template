import { Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { logger } from "@/utils/logger";
import models from "@/models";
import { getKnexInstance as knex } from "@/utils/mysql";

const reportSummary = async (req: Request | any, res: CustomResponse) => {
  try {
    const {
      query: { provider },
    } = req;
    const reportSummary = await knex()
      .select()
      .from("user_summary")
      .where({ status: 1, api_type: "report" });

    if (reportSummary.length)
      return res.success({ data: reportSummary[0].json_value[provider] });
    else res.success({ data: [], msg: "No data found" });
  } catch (error) {
    logger.error(error.stack);
    return res.failure({});
  }
};

export const ReportController = {
  reportSummary,
};
