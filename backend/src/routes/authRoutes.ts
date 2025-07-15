import { Router } from "express";
import rateLimit from "express-rate-limit";
import { loginValidator, registerValidator } from "../utils/authValidator";
import { validationHandler } from "../middleware/validationHandler";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authControllers";
import { config } from "../config/env";

const router = Router();

// Only apply rate limiter in production
const authRateLimiter = config.isProduction
  ? rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 5,
      message: "Too many login attempts, please try again later.",
    })
  : (req: any, res: any, next: any) => next(); // dummy middleware in dev

// register route
router.post("/register", registerValidator(), validationHandler, register);

// login route with conditional rate limiter
router.post(
  "/login",
  authRateLimiter,
  loginValidator(),
  validationHandler,
  login
);

// refresh and logout
router.get("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
