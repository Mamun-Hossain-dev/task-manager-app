import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};
