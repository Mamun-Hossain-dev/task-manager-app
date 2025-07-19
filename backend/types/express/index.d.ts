// src/types/express/index.d.ts
import { TokenPayload } from "../../utils/jwtUtils";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
