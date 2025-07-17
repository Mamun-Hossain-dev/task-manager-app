import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { Role } from "../interfaces/user.interface";
import User from "../models/User";
import { generateTokens, verifyToken } from "../utils/jwtUtils";
import type { Request, Response } from "express";
import type { TokenPayload } from "../utils/jwtUtils";
import { StatusCodes } from "http-status-codes";

// register
export const register = async (req: Request, res: Response) => {
  try {
    console.log("Register routes hit!");
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, msg: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    const tokens = generateTokens({
      userId: String(user._id),
      role: user.role,
    });

    // set tokens in cookies
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration error", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "Server error" });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check user exits or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    // verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    // generate tokens
    const tokens = generateTokens({
      userId: String(user._id),
      role: Role.User,
    });

    // set cookies
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "user logged successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "internal server error" });
  }
};

// refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: "No refresh token provided" });
    }

    // verify refresh token
    const payload = verifyToken(refreshToken, false);
    if (!payload) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, msg: "Invalid refresh token" });
    }

    // generate new access token
    const accessToken = jwt.sign(
      {
        userId: payload.userId,
        role: payload.role,
      },
      config.accessSecret,
      { expiresIn: "7d" }
    );

    res
      .status(StatusCodes.OK)
      .json({ success: false, msg: "Access Token refreshed" });
  } catch (err) {
    console.error("Token refresh error:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Server error" });
  }
};

// logout
export const logout = async (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "strict" as const,
  };

  try {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Logged out successfully" });
  } catch (err) {
    console.error("logout error", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Server error",
    });
  }
};

// get current user
export const getCurrentUser = async (
  req: Request & { user?: TokenPayload },
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, msg: "User not found" });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching current user:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "Sever error" });
  }
};
