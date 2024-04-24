import { NextFunction, Request, Response } from "express";
import { CustomResponse } from "@/interfaces/response.interface";

class IndexController {
  public index = (
    req: Request,
    res: CustomResponse,
    next: NextFunction
  ): void => {
    try {
      return res.success({ data: "Online" });
    } catch (error) {
      console.log(error);
      return res.failure({});
    }
  };
}

export default IndexController;
