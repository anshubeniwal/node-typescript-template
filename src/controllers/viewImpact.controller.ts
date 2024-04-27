import { Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { logger } from "@/utils/logger";
import models from "@/models";

const viewImpact = async (req: Request | any, res: CustomResponse) => {
  try {
    const {
      query: { impactId },
    } = req;
    const viewImpact = await models.user_summary.findAll({
      where: {
        api_type: "view",
        status: 1,
      },
      raw: true,
    });
    if (viewImpact.length)
      return res.success({ data: viewImpact[0].json_value[impactId] });
    else res.success({ data: [], msg: "No data found" });
  } catch (error) {
    logger.error(error.stack);
    return res.failure({});
  }
};

export const ViewImpactController = {
  viewImpact,
};
