import { NextFunction, Request, Response } from "express";
import CommonHelper from "@/helpers/common";
import { logger } from "@utils/logger";

class CommonController {
  public getCityStateOnPincode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestBody = req.query;

      const validator = CommonHelper.commonValidations(requestBody, {
        pincode: "required",
      });
      if (validator && validator.length > 0) {
        const errorStatus = logger.error(validator);
        if (errorStatus) {
          CommonHelper.getSuccessResponse(res, 400, "Failure", true, {
            errors: validator,
          });
        }
      } else {
        const pincodeParams = {
          pincode: requestBody.pincode,
        };
        const pinData = "";
        res.status(200).json({ data: pinData, message: "Success" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CommonController;
