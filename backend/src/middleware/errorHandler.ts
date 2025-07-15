import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { config } from "../config/env";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  const statusCode =
    res.statusCode !== StatusCodes.OK
      ? res.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    message: err.message,
    stack: config?.nodeEnv === "production" ? null : err.stack,
  });
};
