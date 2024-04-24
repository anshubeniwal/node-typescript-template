import { CustomResponse } from "@/interfaces/response.interface";
import { NextFunction, Request } from "express";
import { logger } from "./logger";
import CommonHelper from "@/helpers/common";

export const responseWrapper = (
  callback: (
    req: Request,
    res: CustomResponse,
    next: NextFunction
  ) => Promise<void>
) => {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      logger.error(error.stack);
      return CommonHelper.getSuccessResponse(res, 500, "Failure", false, {
        errors: "Something went wrong!",
      });
    }
  };
};
