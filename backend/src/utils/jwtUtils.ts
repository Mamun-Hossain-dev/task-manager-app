import jwt from "jsonwebtoken";
import { config } from "../config/env";

export interface TokenPayload {
  userId: string;
  role: string;
}

interface generateTokensObj {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (payload: TokenPayload): generateTokensObj => {
  const accessToken = jwt.sign(payload, config.accessSecret, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(payload, config.refreshSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, isAccessToken: boolean = true) => {
  const secret = isAccessToken ? config.accessSecret : config.refreshSecret;

  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (err) {
    return null;
  }
};
