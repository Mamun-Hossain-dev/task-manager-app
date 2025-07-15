import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import { StatusCodes } from "http-status-codes";
import type { TokenPayload } from "../utils/jwtUtils";

export const authenticate = (
  req: Request & { user?: TokenPayload },
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Authentication required" });
  }

  const payload = verifyToken(accessToken);
  if (!payload) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ success: false, msg: "Invalid access token" });
  }

  req.user = payload;
  next();
};

export const authorize = (roles: string[]) => {
  return (
    req: Request & { user?: TokenPayload },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: "UNAUTHORIZED" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, msg: "Insufficient permissions" });
    }
    next();
  };
};
