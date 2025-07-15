import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: Result<ValidationError> = validationResult(req);

  if (!result.isEmpty()) {
    // Only include errors that have `path` (i.e., field errors)
    const formattedErrors = result.array().flatMap((err) => {
      if ("path" in err) {
        return {
          field: err.path,
          message: err.msg,
        };
      }
      return []; // skip alternative/nested errors
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation errors",
      errors: formattedErrors,
    });
  }

  next();
};
