import { NextFunction, Response, Request } from "express";
import { HttpException } from "@exceptions/HttpException";
import { logger } from "@utils/logger";

export const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"];
    if (token && token == "user-token") {
      req.user = token;
      next();
    } else {
      res.status(400).send("Unauthorised");
    }
  } catch (error) {
    logger.error("error", error.stack);
    next(new HttpException(401, "Wrong authentication token"));
  }
};
