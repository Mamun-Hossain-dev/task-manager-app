import { Request } from "express";
import { TokenPayload } from "../utils/jwtUtils";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
